---
sidebar_position: 3
---

# Submission Policy

_Last updated: 10.04.2026_

**Threat Insights Portal** ("TIP", "the platform", "the service") is a malware analysis platform - not a general-purpose file hosting or scanning service. It is designed exclusively for the analysis and investigation of suspected or confirmed malicious files.

By uploading, fetching, or otherwise submitting any file, hash, or URL to Threat Insights Portal, you automatically agree to this **Submission Policy** in its entirety. If you do not agree, do not use the submission features.

This policy applies to **all submission methods**, including but not limited to: direct file uploads via the web interface, URL-based fetches, hash lookups, API submissions, and sandbox submissions.

---

## 1. Definitions

| Term                | Meaning                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Submission**      | Any file upload, URL fetch, hash lookup, reanalysis request, or sandbox execution initiated by a user.                  |
| **Upload**          | Directly uploading a file from your device to TIP.                                                                      |
| **Fetch**           | Submitting a URL for TIP to download and analyze the file at that location.                                             |
| **Reanalysis**      | Requesting a new analysis of a file that was previously submitted.                                                      |
| **Bulk submission** | Submitting more than **10 files within a 10-minute window**, or using automated tools/scripts to submit files at scale. |
| **Registered user** | A user who is logged in with a valid TIP account.                                                                       |
| **Junk file**       | Any file that has no relevance to malware analysis (e.g., blank text files, random images, memes, personal documents).  |

---

## 2. General Rules

- The submission system exists **solely for malware analysis purposes**. Any other use is considered misuse.
- Do not misuse or abuse the submission system. Violations will result in [consequences](#8-consequences).
- Do not submit the same file repeatedly within a short time frame. Use the existing report if one is available.
- Do not use the platform for benchmarking, stress testing, or performance testing.
- Do not use automated scripts, bots, or tools to submit files unless explicitly authorized by the platform owner.
- All submissions are subject to automated and manual review. Suspicious activity may trigger immediate restrictions.
- You must have the legal right to submit any file you upload. Do not submit files you are not authorized to share.

---

## 3. Prohibited Submissions

The following types of submissions are **strictly forbidden** and will result in immediate action:

### 3.1 Illegal & Harmful Content

- Files containing **personal data or confidential information** (e.g., leaked databases, doxing material, stolen credentials, identity documents).
- Files that contain or distribute **illegal materials** of any kind (e.g., CSAM, pirated software, stolen intellectual property).
- Files containing or displaying **NSFW (Not Safe For Work) content** that are not malware-related.

### 3.2 System Abuse

- **Zip bombs or archive bombs** - files designed to consume excessive resources, crash processes, or disrupt platform operations.
- **Fork bombs, logic bombs, or resource exhaustion payloads** specifically targeting TIP infrastructure.
- Junk files submitted with the intent to **spam, flood, or degrade** the service (e.g., uploading hundreds of empty or random files).
- Files designed to **exploit, attack, or compromise** the TIP platform, its infrastructure, or its third-party integrations.

### 3.3 Restricted File Types

- **Password-protected files or archives** (e.g., encrypted `.zip`, `.rar`, `.7z` files or documents requiring a password to open). These cannot be analyzed and will be rejected.
- **Cryptocurrency miners** - bulk or repeated uploads of XMRig or similar mining software are strictly prohibited.
- **Clean, digitally signed, well-known system files** (e.g., Microsoft Windows system binaries, known driver files). These waste analysis resources.
- **100% clean and well-known legitimate software** (e.g., Chrome installer, VLC media player, signed vendor tools).

### 3.4 Bulk & Spam Submissions

- Mass uploading the **same file or near-identical variants** to flood the system.
- Mass uploading files **older than 1 year** (based on the VirusTotal first-submission date).
- Bulk submissions of files from the **BERBEW** family or similar legacy junk malware families.
- Submitting identical files with the **same malware configuration** repeatedly.

---

## 4. Discouraged Submissions

The following types of submissions are **not prohibited** but are strongly discouraged. Repeated discouraged submissions may be treated as abuse:

- **Junk files** - text files, log files, or other files containing blank, irrelevant, or non-executable content.
- **Known clean files** - files confirmed by multiple reputable sources to be 100% safe.
- **Outdated files** - files first submitted to VirusTotal more than **1 years ago**.
- **Trusted JAR files** - well-known Java applications such as popular Minecraft mods from verified sources.
- **Large files submitted in rapid succession** - uploading or fetching many large files (>50 MB) in a short time window strains platform resources.

---

## 5. Permitted Submissions

You **are** allowed and encouraged to submit:

- Any file you **strongly suspect** to be malware or malicious.
- Any file you want to **analyze further** for behavioral, static, or dynamic indicators.
- Previously unknown or newly discovered malware samples.
- Suspicious files received via email, messaging platforms, or other channels.
- Files flagged by your antivirus or security tools that you want a second opinion on.
- URLs pointing to suspected malware downloads (via the [Fetch feature](#10-fetch-submissions)).

---

## 6. Sandbox Submissions Policy

### 6.1 General Notice

All sandbox submissions are subject to both the **general rules above** and the additional sandbox-specific rules below. The sandbox provides a controlled environment for dynamic/behavioral analysis and must be treated with care.

### 6.2 Sandbox Submission Rules

By submitting a file for sandbox analysis, you agree to the following:

- **Malware only:** Uploads must be _suspected or confirmed malicious files_ only. Do **not** submit clean or known-safe software to the sandbox.
- **Legitimate purpose only:** Submissions must be for the purpose of verifying a file's behavior or malicious status - **not** for testing, enumeration, fingerprinting, or manipulation of the sandbox environment.
- **No sandbox detection/evasion testing:** Any attempt to identify, fingerprint, profile, or extract information about the sandbox infrastructure (OS version, installed tools, network configuration, hardware identifiers) is strictly prohibited.
- **No custom attack files:** Purpose-built files designed specifically to interfere with, exploit, escape, or compromise sandbox systems are forbidden.
- **No destructive intent:** Files intended solely to damage, disable, wipe, or destroy sandbox instances or underlying infrastructure are not permitted.
- **No cryptocurrency miners:** Uploading miners such as _XMRig_ or similar tools to the sandbox is not allowed under any circumstance.
- **No lateral movement attempts:** Files that attempt to reach out to or attack other systems, networks, or services beyond the sandbox scope are prohibited.
- **No data exfiltration:** Files designed to extract data from the sandbox environment (e.g., credentials, configuration files, environment variables) for intelligence-gathering purposes are forbidden.

### 6.3 Sandbox Data Handling

- **Privacy:** Sandbox submissions are _not publicly visible_ by default. You may choose to share your analysis results with others.
- **Ownership and visibility:** The owner of Threat Insights Portal (**Neiki**) retains the right to view, review, and analyze any submission and may share it at their discretion for security research or platform improvement.
- **Storage:** Uploaded files are stored only _temporarily_ for analysis purposes. Files and execution artifacts are not retained or redistributed after the analysis session completes.
- **Third-party sharing:** Sandbox submissions are **not** shared with external services or third parties by default. This may change in the future - users will be notified in advance of any policy change.
- **Execution environment:** Files are executed in an isolated, controlled environment. TIP is not responsible for any behavior exhibited by the submitted file during analysis.

---

## 7. Rate Limits & Fair Usage

To ensure fair access for all users, the following limits apply:

| User Type  | Concurrent Tasks | Submissions per Hour         | Max File Size    |
| ---------- | ---------------- | ---------------------------- | ---------------- |
| Registered | 2 (default)      | Subject to global rate limit | Platform default |

- A **global rate limit** is enforced across the platform. Exact thresholds may be adjusted without notice to maintain stability.
- **Excessive or repeated submissions** of the same file will be throttled or blocked automatically.
- Users who consistently hit rate limits may be temporarily restricted.
- If you believe your use case requires higher limits, contact us via [Discord](https://www.threat.rip/discord).

---

## 8. Consequences

Violating this submission policy may result in penalties proportional to the severity and frequency of the violation:

### 8.1 Minor Violations

_Examples: occasional discouraged submissions, unintentional duplicate uploads, submitting a clean file by mistake._

- Warning via platform notification or email.
- Temporary reduction in submission quota.
- Reduced trust level and loss of certain permissions (e.g., sandbox access).

### 8.2 Moderate Violations

_Examples: repeated discouraged submissions after warning, minor bulk spam, submitting password-protected files repeatedly._

- Temporary suspension of submission privileges (24–72 hours).
- Temporary IP-based rate limiting or blocking via Cloudflare.
- Account trust level reduction.

### 8.3 Severe Violations

_Examples: uploading illegal content, attacking sandbox infrastructure, mass spam, attempting to exploit the platform._

- **Permanent ban** of your account on `tip.neiki.dev` and `www.threat.rip` with **no option** to create a new account.
- **Permanent IP block** via Cloudflare.
- Referral to relevant authorities if the violation involves illegal activity.
- All associated data and submissions may be removed or retained for investigation at TIP's discretion.

---

## 9. Ban Appeal

If your registered account has been banned, you may appeal the decision:

1. Join the official [Discord server](https://www.threat.rip/discord).
2. Open a support ticket via the ticket system.
3. Provide your **username** and a clear explanation of why you believe the ban should be reconsidered.
4. Appeals are reviewed on a case-by-case basis. There is **no guarantee** of reinstatement.
5. Submitting false or misleading information in an appeal may result in the appeal being permanently denied.
6. You may only submit **one appeal per ban**. Repeated or spammy appeals will be ignored.

---

## 10. Fetch Submissions

The **Fetch** feature allows you to submit a URL for TIP to download and analyze the file hosted at that location.

### 10.1 Supported Hosts

The following hosts are currently supported for URL-based fetch submissions:

| Host                 | Example URL                                  |
| -------------------- | -------------------------------------------- |
| `discord.com`        | `https://discord.com/...`                    |
| `cdn.discordapp.com` | `https://cdn.discordapp.com/attachments/...` |
| `github.com`         | `https://github.com/user/repo/releases/...`  |
| `gofile.io`          | `https://gofile.io/d/...`                    |

### 10.2 Fetch Rules

- All general submission rules apply to fetched files.
- You must ensure the URL points to a file you have the right to submit for analysis.
- Do not submit URLs pointing to legitimate, non-malicious software downloads.
- Do not use the fetch feature to flood the platform with rapid sequential URL submissions.
- URLs that are inaccessible, expired, or return errors will be rejected.
- TIP is not responsible for the content hosted at external URLs.

### 10.3 Unsupported Hosts

If the host you need is not listed above, please contact support via [Discord](https://www.threat.rip/discord) **before** submitting. Unsupported URLs will be rejected automatically.

---

## 11. API Submissions

If you are using the TIP REST API to submit files programmatically:

- All rules in this policy apply equally to API submissions.
- API rate limits may differ from web interface limits. Refer to the [API documentation](/docs/intro) for details.
- Automated bulk submissions via the API require **prior authorization** from the platform owner.
- Unauthorized automated submissions will result in immediate API key revocation and potential account ban.
- Do not share your API key with third parties. You are responsible for all submissions made with your credentials.

---

## 12. Third-Party Services

When you submit a file to TIP, it may be forwarded to one or more of the following third-party analysis services:

- [VirusTotal](https://virustotal.com)
- [ANY.RUN](https://app.any.run)
- [Hatching Triage](https://tria.ge/)
- [ReversingLabs](https://www.reversinglabs.com/)
- [ThreatZone](https://app.threat.zone/)
- [Kaspersky OpenTIP](https://opentip.kaspersky.com)
- [UnpacMe](https://unpac.me/)
- [CyberFortress](https://cyber-fortress.com)
- [Virus.Exchange](https://virus.exchange/)

By submitting a file, you acknowledge and accept that:

- Your file may be shared with any or all of the above services.
- Each third-party service has its own terms of service and privacy policy, which you are responsible for reviewing.
- TIP has **no control** over how third-party services process, store, or share your submitted files.
- Once a file is shared with a third-party service, it may become publicly accessible on that platform (e.g., VirusTotal).

---

## 13. Reporting Violations

If you observe another user violating this policy, you can report it:

- Open a support ticket via the [Discord server](https://www.threat.rip/discord).
- Include the **report ID**, **username** (if known), and a description of the violation.
- Reports are reviewed confidentially. You will not be notified of the outcome.

---

## 14. Policy Changes

- TIP reserves the right to update or modify this Submission Policy at any time without prior notice.
- Significant changes will be announced via the [Discord server](https://www.threat.rip/discord) or the platform blog.
- Continued use of the platform after changes are published constitutes acceptance of the revised policy.
- It is your responsibility to review this policy periodically.

---

## 15. Contact

For questions, clarifications, or special requests related to this policy, please reach out via:

- **Discord:** [https://www.threat.rip/discord](https://www.threat.rip/discord)
- **Website:** [https://tip.neiki.dev](https://tip.neiki.dev)

---

:::info Important Notice
This Submission Policy is a binding agreement between you and Threat Insights Portal. Ignorance of the policy does not exempt you from its enforcement. By using the platform, you confirm that you have read, understood, and agreed to all terms outlined above.
:::
