---
sidebar_position: 15
---

# FAQs & Mission

## Goal of Threat Insights Portal

The goal behind Threat Insights Portal was to create a free, community-driven platform that helps users determine whether a file is trustworthy or potentially harmful.

Many existing online analysis tools are hidden behind paywalls or restricted access. To overcome this, I reached out to several of these services to explore collaboration opportunities. The idea was simple: bring these tools together in one place and provide a unified summary to help people stay safe and avoid accidentally running malware or other threats.

At its core, Threat Insights Portal uploads files to popular online analysis platforms such as VirusTotal, ANY.RUN, Triage, and others. It then consolidates the resulting reports into a single, easy-to-understand summary.

Over time, the project grew beyond just being a report aggregator. It now includes a community where users can share opinions, analysis, and verdicts with one another. New features were added to enhance malware detection and analysis, including:

- Extracting file metadata
- Displaying readable content
- Identifying interesting strings
- Unpacking files to access embedded source code or components
- Mapping relationships between files
- Extracting malware configurations

And more

There is also a download feature that allows users to retrieve files and share them with the community.

## Despite its growth, the core mission remains unchanged: to offer a free tool that helps users avoid malware infections and to foster a global cybersecurity community focused on awareness and safety.

## Frequently Asked Questions

---

**1. "You already have too many running reports"**

:small_orange_diamond: This means your account is already using the full number of allowed parallel tasks (default: **3**).  
:small_orange_diamond: Or you're not logged in and using the default **guest** user, which also has a limit of **3** tasks.

---

**2. AnyRun has problems with my file**

:small*orange_diamond: Sometimes when a file is uploaded to my site and forwarded to AnyRun, its integrity might \_somehow* change (common with **NSIS** or other packers).  
:small_orange_diamond: If AnyRun doesn't run it properly, just open a ticket or ping me in #chatt . I’ll rerun it with **max/custom settings**.

---

**3. Weird strings got extracted, why?**

:small_orange_diamond: Extracting strings from binary files can produce odd or unrelated results.  
:small_orange_diamond: If you see strange strings, just #create-ticket and send me the report. I’ll check it out.

---

**4. I have a suggestion or an idea**

:bulb: Ping me or use #create-ticket — I’m always open to feedback! You can also drop ideas in #suggestions .

---

**5. False positive or missed malware**

:no_entry_sign: If you find false positives or undetected malware, please ping me or #create-ticket . I’ll gladly fix the report or detection.

---

**6. How can I support the project?**

:raised_hands: Just upload new or unknown malware and share the public reports — that already helps a lot!

---

**7. I want to use a report in a video/blog/elsewhere**

:loudspeaker: You’re welcome to use the reports in any **legal** media (video, blog, etc.).  
:white_check_mark: You can share, review, or even critique the service — both **positive and negative** feedback is appreciated!

Have more questions? Feel free to contact us or open an issue!
