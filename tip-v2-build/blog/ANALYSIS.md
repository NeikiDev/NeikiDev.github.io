---
slug: weedhack-loader-ai-analysis
title: Weedhack Loader (AI Analysis)
authors: [neikidev]
tags: []
---

# Malware Analysis — `Example-1.0.0 (7).jar`

**Type:** Minecraft Fabric mod / standalone jar stager
**Stealer target:** Minecraft credentials (username, UUID, access token)
**C2 resolution:** Ethereum smart contract + DNS-over-HTTPS
**Second stage:** `dev.majanito.Main.initializeWeedhack` (downloaded, loaded in-memory)
**Campaign/operator UUID:** `6e1f79b4-c2af-4412-ab2d-4dcbc93aaeaa`

## Contents

- 10 classes in `app.model` (original filenames leaked by JADX comments:
  `Entrypoint.java`, `Helper.java`, `FabricAdapter.java`, `ExampleMod.java`, `CloudflareDNS.java`)
- All strings obfuscated with a trivial single-byte XOR encoded as hex
- One custom `ClassLoader` for in-memory jar loading
- No native code, no packing, no anti-debug

## Class map (obfuscated → original role)

| Obfuscated name           | Original file        | Role                                                                                            |
| ------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `encoderVersion`          | —                    | XOR-hex string decoder                                                                          |
| `AsyncMediator`           | `ExampleMod.java`    | Fabric `ModInitializer`; collects MC creds, exfiltrates, launches stage 2                       |
| `ListenerBridge`          | `Entrypoint.java`    | `main()` entry; self-forks with `javaw --jw`, launches stage 2                                  |
| `NodeFactory`             | `Helper.java`        | Downloads stage-2 jar, loads via `ExampleMixin`, invokes `dev.majanito.Main.initializeWeedhack` |
| `ExampleMixin`            | —                    | In-memory `ClassLoader` (classes + resources from byte[] maps)                                  |
| `GuardStorage`            | `CloudflareDNS.java` | Raw-socket HTTP(S) client with DoH resolver; all-trust `X509TrustManager`                       |
| `GuardStorage$CacheEntry` | —                    | DoH result cache entry (5-min TTL)                                                              |
| `ParameterRouter`         | `FabricAdapter.java` | Ethereum smart-contract C2-domain resolver with RSA-signed response verification                |

---

## 1. String obfuscation scheme (`encoderVersion.d`)

All hex strings of the form `[KK][HH]{2,}` are decoded by XORing each byte with the first byte (the key).

```python
def d(s: str) -> str:
    if not s or len(s) < 4 or len(s) % 2: return s
    try:
        k = int(s[:2], 16)
        return bytes(int(s[i:i+2],16) ^ k for i in range(2, len(s), 2)).decode('utf-8')
    except Exception:
        return s
```

`isHex` gate means non-hex inputs (like a real UUID) pass through untouched, which is why the code does `encoderVersion.d(uuid.toString())` — a safe no-op for real UUIDs, a decoder for the `"offline"` fallback.

---

## 2. Decoded strings — full table

### `encoderVersion` (decoder itself — no encoded strings)

### `AsyncMediator`

| Encoded             | Decoded                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `suffixPoint` field | `6e1f79b4-c2af-4412-ab2d-4dcbc93aaeaa` (campaign ID)                 |
| `175a7873...5a27`   | `Mod init state: M0`                                                 |
| `0b46646f...463a`   | `Mod init state: M1`                                                 |
| `422d24242e2b2c27`  | `offline` (fallback when MC session has no UUID)                     |
| `b6fbd9d2...fb84`   | `Mod init state: M2`                                                 |
| `b282ca83...8586`   | `0x1280a841Fbc1F883365d3C83122260E0b2995B74` **(Ethereum contract)** |
| `e1a28e8f...9184`   | `Content-Type`                                                       |
| `325342...5d5c`     | `application/json`                                                   |
| `f8a3bdbe...8a96`   | `[EFN] ern`                                                          |

### `GuardStorage`

| Encoded           | Decoded                                               |
| ----------------- | ----------------------------------------------------- |
| `support58[0]`    | `https://cloudflare-dns.com/dns-query?name=%s&type=A` |
| `support58[1]`    | `https://1.1.1.1/dns-query?name=%s&type=A`            |
| `support58[2]`    | `https://dns.google/resolve?name=%s&type=A`           |
| `01406262647175`  | `Accept`                                              |
| `3f5e4f...5051`   | `application/dns-json`                                |
| `b391d7d2c7d291`  | `"data"`                                              |
| `645e` / `3012`   | `:` / `"`                                             |
| `b6dec2c2c6c5`    | `https`                                               |
| `bd92`            | `/`                                                   |
| `bcb1b6`          | `\r\n`                                                |
| `212c2b2c2b`      | `\r\n\r\n`                                            |
| `4a6a787a7a6a`    | `200`                                                 |
| `e5ac8b93...9680` | `Invalid response`                                    |
| `115f7e31...7568` | `No body`                                             |
| `720600...1716`   | `transfer-encoding: chunked`                          |

### `ListenerBridge`

| Encoded           | Decoded                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `suffixPoint`     | `6e1f79b4-c2af-4412-ab2d-4dcbc93aaeaa`                                                   |
| `86fda4e3...a4fb` | `{"executionEnvironment":"DoubleClick","userId":"6e1f79b4-c2af-4412-ab2d-4dcbc93aaeaa"}` |
| `d5b7bcbb`        | `bin`                                                                                    |
| `a9c3c8df...d1cc` | `javaw.exe`                                                                              |
| `163b7c7764`      | `-jar`                                                                                   |

### `NodeFactory`

| Encoded           | Decoded                                                      |
| ----------------- | ------------------------------------------------------------ |
| `06367e37...3132` | `0x1280a841Fbc1F883365d3C83122260E0b2995B74` (same contract) |
| `2e004d424f5d5d`  | `.class`                                                     |
| `7e2c1b0d...2d4d` | `Resource state: S3`                                         |
| `b0d4d5c6...d9de` | `dev.majanito.Main` **(stage-2 class)**                      |
| `ddb4b3b4...beb6` | `initializeWeedhack` **(stage-2 entry method)**              |

### `ParameterRouter`

| Encoded                  | Decoded                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `threshold11`            | `0xce6d41de` (4-byte EVM function selector)                                                |
| `needNode`               | Base64 DER-encoded RSA public key (X.509 SubjectPublicKeyInfo)                             |
| `1a7b6a6a...7574`        | `application/json`                                                                         |
| `512a733b...602c`        | `{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"%s","data":"%s"},"latest"],"id":1}` |
| `3210405741475e46100810` | `"result":"`                                                                               |
| `1230`                   | `"`                                                                                        |
| `04347c`                 | `0x`                                                                                       |
| `53001b12...0012`        | `SHA256withRSA`                                                                            |
| `7c32135c...1008`        | `No result`                                                                                |

### 32 Ethereum RPC endpoints (`wireRuntime[]`)

```
https://eth.llamarpc.com
https://eth.api.onfinality.io/public
https://rpc.eth.gateway.fm
https://ethereum-rpc.publicnode.com
https://eth.rpc.blxrbdn.com
https://ethereum.rpc.subquery.network/public
https://ethereum-json-rpc.stakely.io
https://ethereum-public.nodies.app
https://core.gashawk.io/rpc
https://mainnet.gateway.tenderly.co
https://ethereum-mainnet.gateway.tatum.io
https://eth1.lava.build
https://eth.meowrpc.com
https://public-eth.nownodes.io
https://rpc.mevblocker.io/fast
https://rpc.mevblocker.io/noreverts
https://rpc.mevblocker.io/fullprivacy
https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7
https://eth-mainnet.public.blastapi.io
https://ethereum.public.blockpi.network/v1/rpc/public
https://eth-mainnet.rpcfast.com?api_key=xbhWBI1Wkguk8SNMu1bvvLurPGLXmgwYeC4S6g2H7WdwFigZSmPWVZRxrskEQwIf
https://eth.drpc.org
https://eth.blockrazor.xyz
https://rpc.flashbots.net/fast
https://gateway.tenderly.co/public/mainnet
https://rpc.flashbots.net
https://rpc.fullsend.to
https://eth.merkle.io
https://api.zan.top/eth-mainnet
https://rpc.mevblocker.io
https://endpoints.omniatech.io/v1/eth/mainnet/public
https://1rpc.io/eth
```

---

## 3. Execution flow

There are **two entry points**, leading to the same stage-2 dispatch.

### Path A — Fabric mod: `AsyncMediator.onInitialize()`

Triggered by a Minecraft Fabric client loading the jar as a mod. `fabric.mod.json` must list this class as a `ModInitializer` entrypoint.

1. `class_310.method_1551()` → Minecraft client (`MinecraftClient.getInstance`).
2. `class_320 session = client.method_1548()` → `Session` object.
3. Pulls: `session.method_1676()` (username), `session.method_44717()` (UUID), `session.method_1674()` (access token).
4. Builds JSON:
   ```json
   {
     "executionEnvironment": "Fabric",
     "minecraftInfo": {
       "username": "...",
       "uuid": "...",
       "accessToken": "..."
     },
     "userId": "6e1f79b4-c2af-4412-ab2d-4dcbc93aaeaa"
   }
   ```
5. `ParameterRouter.regionStrategy("0x1280a841...")` → resolves C2 domain from Ethereum.
6. HTTP POST `https://<C2>/api/delivery/handler` with a second JSON variant (same fields, slightly different shape — likely telemetry / first-run beacon).
7. Spawns a thread → `NodeFactory.commandDelegate(jsonPayload)`.

### Path B — Standalone jar: `ListenerBridge.main(args)`

Triggered by `java -jar Example-...jar`.

1. `parameterInstance(args)` — if `--jw` absent, self-fork:
   ```
   %JAVA_HOME%\bin\javaw.exe -jar <self.jar> --jw
   ```
   then `System.exit(0)`. Detaches from parent console (`javaw` = no window on Windows).
2. Builds JSON `{"executionEnvironment":"DoubleClick","userId":"<campaign-uuid>"}`.
3. Spawns thread → `NodeFactory.commandDelegate(jsonPayload)`.

### Shared — `NodeFactory.commandDelegate(context)`

1. HTTP GET `https://<C2>/files/jar/module` via `GuardStorage.cursor33` (raw TLS socket).
2. Unpack the returned bytes as a JAR (in-memory): `.class` entries → name→bytes map; others → resource map.
3. `ExampleMixin = new ClassLoader(systemLoader)` wrapping those maps.
4. `Class c = loader.loadClass("dev.majanito.Main")`.
5. `Object inst = c.getDeclaredConstructor().newInstance()`.
6. New thread: `c.getMethod("initializeWeedhack", String.class).invoke(inst, context)`.

The `context` string (the stolen-creds JSON) is handed to stage 2, which presumably does the actual exfiltration / hacking functionality.

---

## 4. C2 resolution — Ethereum smart contract lookup

This is the distinctive part. The C2 hostname is not hardcoded; it's read from an on-chain view function so the operator can rotate domains by sending a transaction.

### `ParameterRouter.regionStrategy("0x1280a841...")`

For each of 32 Ethereum RPC endpoints (`wireRuntime`):

1. `performInspector(rpc, contractAddr)`:
   - POST to `<rpc>` with body
     ```json
     {
       "jsonrpc": "2.0",
       "method": "eth_call",
       "params": [
         {
           "to": "0x1280a841Fbc1F883365d3C83122260E0b2995B74",
           "data": "0xce6d41de"
         },
         "latest"
       ],
       "id": 1
     }
     ```
   - `0xce6d41de` is the 4-byte function selector (first 4 bytes of keccak256 of the function signature — unknown ABI, but clearly a zero-arg getter returning `bytes` / `string`).
   - Reads `"result":"0x…"` from the response.
2. `decode(hex)`:
   - Skips optional `0x` prefix.
   - Bytes `[32..64]` of the returned blob = length of payload (hex-encoded length field, parsed as int from chars 64..128).
   - Bytes starting at `[64..]` (hex chars 128..) are the payload, one UTF-8 char per 2 hex chars (skipping zero bytes / ABI padding). This is standard Solidity `bytes` ABI encoding: 32-byte offset, 32-byte length, then data.
   - Returns: `"<hostname>|<base64 sig>"`.
3. `verify(text, sig)`:
   - Loads RSA public key from base64-decoded `needNode` constant.
   - `SHA256withRSA` verify `sig` over UTF-8 bytes of `text`.
4. First RPC whose response verifies wins → `text` (the hostname) is used.

This means **taking down the contract requires action on Ethereum mainnet** (the operator's wallet can call `setDomain(...)` or similar to rotate). Blocking any single RPC does not stop the malware; 32 public endpoints are tried.

### DNS resolution via DoH (`GuardStorage.stateSink`)

Once the hostname is known, DNS is resolved **bypassing the system resolver**:

1. If already an IPv4 literal → return as-is.
2. Check 5-min cache (`compositeMiddleware`).
3. Try each of:
   - `https://cloudflare-dns.com/dns-query?name=<host>&type=A`
   - `https://1.1.1.1/dns-query?name=<host>&type=A`
   - `https://dns.google/resolve?name=<host>&type=A`
     Each uses `Accept: application/dns-json` and parses JSON looking for `"data":"<ip>"` that matches `\d{1,3}(\.\d{1,3}){3}`.
4. Fallback: `InetAddress.getByName`.

Purpose: evade enterprise DNS filtering / Pi-hole / Windows `hosts` file.

### HTTP transport (`GuardStorage.cursor33`, `mutablePool`)

Raw `Socket` / `SSLSocket`, no high-level HTTP library. Key quirks:

- `X509TrustManager` that accepts _everything_ (no cert validation).
- SNI header is still set (`SNIHostName(host)`) so CDN fronting works even when connecting to the DoH-resolved IP directly.
- Manual HTTP/1.1 request construction, `Connection: close`.
- Own chunked-transfer decoder (`stopRegion`) for `Transfer-Encoding: chunked` responses.

Why: avoids hooks on `HttpClient`/`HttpURLConnection`, bypasses proxy settings, ignores certificate pinning / corporate MITM.

---

## 5. Persistence / evasion

| Technique                                 | Location                                         | Purpose                                                                          |
| ----------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Self-fork with `javaw.exe -jar self --jw` | `ListenerBridge.parameterInstance`               | Detach from console; `--jw` sentinel prevents infinite re-fork                   |
| All-trust `X509TrustManager`              | `GuardStorage.1`, `GuardStorage.2`               | Bypass corporate TLS inspection / self-signed issues                             |
| DoH resolution                            | `GuardStorage.stateSink`                         | Bypass DNS-based blocking                                                        |
| Raw socket HTTP                           | `GuardStorage.cursor33`/`mutablePool`            | Bypass library hooks / proxy enforcement                                         |
| In-memory jar loading                     | `ExampleMixin` + `NodeFactory`                   | No stage-2 payload ever touches disk                                             |
| Thread launches                           | `AsyncMediator`, `NodeFactory`, `ListenerBridge` | Non-blocking; initialization continues even if C2 hangs                          |
| String XOR obfuscation                    | `encoderVersion.d`                               | Defeat naive `strings`-based IoC extraction                                      |
| Semantically-misleading names             | all classes                                      | Waste reverse-engineer time                                                      |
| Smart-contract C2                         | `ParameterRouter`                                | Operator can rotate domains without repackaging                                  |
| RSA-signed C2 response                    | `ParameterRouter.verify`                         | Prevents takeover by anyone who compromises the contract without the private key |

Notably **absent:**

- No VM/sandbox checks.
- No anti-debug.
- No native code / JNI.
- No registry/autorun persistence — relies on Minecraft mod auto-load or user re-running the jar.
- No packing of class files.

---

## 6. Indicators of Compromise (IoCs)

### Static

- **SHA-likely filename:** `Example-1.0.0 (7).jar`
- **Operator campaign UUID:** `6e1f79b4-c2af-4412-ab2d-4dcbc93aaeaa`
- **Ethereum contract:** `0x1280a841Fbc1F883365d3C83122260E0b2995B74` (mainnet)
- **EVM function selector:** `0xce6d41de`
- **Stage-2 FQCN:** `dev.majanito.Main`
- **Stage-2 method:** `initializeWeedhack(String)`
- **Fork sentinel arg:** `--jw`

### Network

- HTTP POST `/api/delivery/handler` (creds beacon) — on dynamic host from contract
- HTTP GET `/files/jar/module` (stage-2 download)
- 32 Ethereum JSON-RPC endpoints (listed above)
- 3 DoH endpoints: `cloudflare-dns.com`, `1.1.1.1`, `dns.google`

### Host artefacts

- Child process: `%JAVA_HOME%\bin\javaw.exe -jar <path-to-jar> --jw`
- No disk drops; stage-2 classes live in JVM heap only.

### Detection ideas

- Java process issuing `eth_call` with data `0xce6d41de` to any of the 32 RPCs.
- Minecraft client emitting HTTPS traffic with JSON body containing `"executionEnvironment":"Fabric"` and `"accessToken"`.
- Jar with class named `encoderVersion` whose `d(String)` does XOR-hex decoding (high-confidence family signature).

---

## 7. Deobfuscation workflow used

1. **Listed all classes** (`mcp__jadx__get_all_classes`) — 10 classes in `app.model`.
2. **Dumped sources** for each class.
3. **Identified the string decoder** (`encoderVersion.d`) — trivial XOR-hex.
4. **Extracted all hex literals** from each class into a Python script.
5. **Ran the decoder** on every literal; annotated the sources with decoded values.
6. **Mapped control flow** across entry points (`main`, `onInitialize`) through dispatcher (`commandDelegate`) to in-memory classloader (`ExampleMixin`).
7. **Recognized the Ethereum C2 pattern** from the `eth_call` JSON body + 4-byte selector + RSA signature-verified response.
8. **Mapped original filenames** via `JADX INFO: compiled from:` comments to understand the author's naming scheme.

### Remaining work (not done here)

- Fetch the stage-2 jar (`https://<C2>/files/jar/module`) in an isolated sandbox and repeat the process on `dev.majanito.Main` — likely a Minecraft cheat/stealer given `initializeWeedhack` and the DoubleClick/weedhack naming.
- Query the contract state on mainnet to recover current and historical C2 hostnames:
  ```
  cast call 0x1280a841Fbc1F883365d3C83122260E0b2995B74 0xce6d41de --rpc-url https://eth.llamarpc.com
  ```
  Then ABI-decode bytes → split on `|` → pubkey-verify signature.
- Pull transaction history for the contract to identify the operator wallet and any linked addresses.
- `GuardStorage.indexOf` failed jadx decompilation (`Code restructure failed`); a byte-substring search — re-decompile with CFR/Procyon if exact semantics matter.

---

## 8. Triage summary

**Severity:** High — credential stealer targeting Minecraft accounts, using novel Ethereum-based C2 for resilient domain rotation, with in-memory payload loading that defeats file-based AV.

**Blocking recommendation:**

- Network egress rule: alert on `eth_call` bodies containing contract address `0x1280a841Fbc1F883365d3C83122260E0b2995B74`.
- Network egress rule: alert on DoH traffic from Java processes.
- Endpoint: flag Java apps that spawn `javaw.exe … --jw`.
- Credential: assume any Minecraft account that ran this jar is fully compromised (username, UUID, and access token exfiltrated).

**Author fingerprinting clues:**

- Class/field naming style: tech-flavoured nouns with random numbers (`support58`, `package71`, `role97`, `cursor33`).
- Method-name verb-noun-number pattern (`stateSink`, `stopRegion`, `mutablePool`).
- Package `dev.majanito.*` and method name `initializeWeedhack` suggest the same author previously published, or is distributing alongside, a Minecraft client-side cheat called "Weedhack" / "Majanito".
