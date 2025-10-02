---
sidebar_position: 11
---

# Search Documentation

Here you can find the Extended Search Documentation!

## Keywords

| **Keyword**  | **Description**                                       |
| ------------ | ----------------------------------------------------- |
| `FILENAME`   | Name of the file, including extensions (e.g., `.exe`) |
| `SHA256`     | SHA-256 cryptographic hash of the file                |
| `MD5`        | MD5 hash value of the file                            |
| `SHA1`       | SHA-1 hash value of the file                          |
| `FILETYPE`   | File type or format                                   |
| `VERDICT`    | Security verdict or analysis result                   |
| `USER`       | User linked to the file                               |
| `PACKER`     | Packer or compression method used                     |
| `TYPETAG`    | Tag indicating file type or category                  |
| `HASH`       | General hash value of the file                        |
| `SCORE`      | Security score or risk rating                         |
| `REPUTATION` | Reputation status or score of the file                |
| `THREAT`     | Specific malware Threat detection name                |
| `FILESIZE`   | File size in bytes                                    |

## Operators

| **Operator** | **Description**                                          |
| ------------ | -------------------------------------------------------- |
| `OR`         | Returns results that match any of the specified criteria |
| `AND`        | Returns results that match all of the specified criteria |
| `NOT`        | Excludes results that match the specified criteria       |

## Examples

Here are some example queries to help you get started:

```sql
threat:Family.XWORM

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
