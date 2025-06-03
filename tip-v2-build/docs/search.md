---
sidebar_position: 11
---

# Search Documentation

Here you can find the Extended Search Documentation!

## Keywords

| **Keyword**    | **Description**                                             |
| -------------- | ----------------------------------------------------------- |
| `FILENAME`     | Name of the file, including extensions (e.g., `.exe`)       |
| `UID`          | Unique identifier for a file or user                        |
| `SHA256`       | SHA-256 cryptographic hash of the file                      |
| `MD5`          | MD5 hash value of the file                                  |
| `SHA1`         | SHA-1 hash value of the file                                |
| `FILETYPE`     | File type or format                                         |
| `SIGNER`       | Entity that signed the file, if applicable                  |
| `VERDICT`      | Security verdict or analysis result                         |
| `USER`         | User linked to the file                                     |
| `PACKER`       | Packer or compression method used                           |
| `SSDEEP`       | Fuzzy hash (ssdeep) for similarity detection                |
| `MAGIC`        | File signature or magic number                              |
| `TLSH`         | Trend Micro Locality Sensitive Hash (TLSH) value            |
| `AUTHENTIHASH` | Authenticode hash for verifying file authenticity           |
| `TYPETAG`      | Tag indicating file type or category                        |
| `PASSWORD`     | Password related to the file, if present                    |
| `HASH`         | General hash value of the file                              |
| `PENDING`      | Indicates files awaiting processing or analysis             |
| `QUEUED`       | Files that are in the processing queue                      |
| `ENCRYPTED`    | Shows if the file is encrypted                              |
| `SCORE`        | Security score or risk rating                               |
| `REPUTATION`   | Reputation status or score of the file                      |
| `VOTE`         | User’s vote (`DOWNVOTE`, `NEUTRAL`, `UPVOTE`)               |
| `VOTELABEL`    | Label assigned by user (`MALWARE`, `CLEAN`, etc.)           |
| `VOTEFAMILY`   | Malware family specified by user (`Redline`, `DCRAT`, etc.) |
| `COMMENT`      | Search within user vote comments                            |
| `TAG`          | Tag from analysis or metadata                               |
| `FAMILY`       | Specific malware family name                                |
| `CONTENT`      | Search within extracted file content                        |
| `VTSCORE`      | VirusTotal detection score                                  |
| `FILESIZE`     | File size in bytes                                          |

## Operators

| **Operator** | **Description**                                          |
| ------------ | -------------------------------------------------------- |
| `OR`         | Returns results that match any of the specified criteria |
| `AND`        | Returns results that match all of the specified criteria |
| `NOT`        | Excludes results that match the specified criteria       |

## Examples

Here are some example queries to help you get started:

```sql
filename:solara.exe AND score:100

family:lumma OR tag:stealer AND score:100

encrypted:true OR password:infected OR filetype:.zip

filesize:10mb OR filesize:>10mb OR filesize:10mb-20mb
```

You can combine keywords and operators to create powerful search queries.

**Tip:** Use uppercase (`AND`, `OR`, `NOT`) for operators.

## Specials

### File Size Search

You can filter files by their size using the `filesize` keyword. Supported formats include bytes (`b`), kilobytes (`kb`), megabytes (`mb`). Here are some examples:

- Files exactly 10MB:  
  `filesize:10mb`
- Files larger than 10MB:  
  `filesize:>10mb`
- Files 10MB or larger:  
  `filesize:>=10mb`
- Files smaller than 10MB:  
  `filesize:<10mb`
- Files 10MB or smaller:  
  `filesize:<=10mb`
- Files between 10MB and 20MB:  
  `filesize:10mb-20mb`

You can use these filters in combination with other keywords and operators for advanced searches.
