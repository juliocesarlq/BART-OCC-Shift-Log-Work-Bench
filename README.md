
# Bay Area Rapid Transit (BART) - Operations Control Center (OCC) - Shift Log Workbench 🚆 👷 ⌨️

## Table of Contents
1. [Summary](#summary)
    1. [Background](#background)
    2. [Problem](#problem)
    3. [Objective](#objective)
2. [Solutions](#solutions)
3. [UI/UX Design](#uiux-design)
4. [Shift Log Work Bench by BART - Initial Release 1.0 ](#shift-log-work-bench-by-bart---initial-release-10)
5. [Technologies](#technologies)

## Summary

### Background
The Bay Area Rapid Transit District (BART) is familiar to many as one of the country’s premier commuter rail 
systems. But some of the most critical work at BART is done in a place the public almost never sees: the 
Operations Control Center (OCC). Similar to air traffic control, OCC’s staff monitor trains running in the system 
and provide necessary information, instructions, and interventions to train operators based on real-time 
conditions, helping guide them to their destinations safely and efficiently.  Every day, OCC managers complete 
shift logs detailing maintenance work, police activity, delays, equipment abnormalities, and other events 
impacting the regular operation of the system. These logs are then compiled into reports presented to BART 
leadership every morning. Executive staff are often very busy and only have time to skim the 7–8-page report.  
To address this issue, BART Maintenance & Engineering (M&E) hopes to improve the process of inputting, 
categorizing, condensing, extracting, and reporting this data so that District leadership is presented with concise 
information that is comprehensible at a glance. 

### Problem
This project will entail developing software tools to streamline and optimize OCC reporting from end to end. As 
it is, the daily process begins with OCC managers inputting log items to be reviewed and annotated by the 
relevant Engineering/Maintenance departmental experts, before being published in the daily executive reports 
and saved to a database for future OCC reference.  This project will require a more user-friendly interface and 
categorization scheme for OCC log inputs. Once items are entered, the new system will need to make the 
annotation process more intuitive and straightforward, allowing M&E staff to quickly review and provide 
feedback. Finally, the system will produce a one-page dashboard incorporating graphics, text, and numerical 
data to elegantly present information that is actionable and easily digested. All steps in this process will be 
accessible via web browser so that staff can work via tablet, laptop, or desktop workstation. 
 
 
### Objective
This project will be the first step in an iterative effort by the District to improve OCC event reporting. Over time, 
machine learning and natural language processing will be incorporated in order to further automate and 
improve the system. As such, this experience will be a chance for interns to create a product that improves the 
day-to-day functioning of BART, while at the same time developing ideas and feedback to guide future stages of 
process optimization. 

## Solutions
* co-created a web application with three other software engineers to replace system for inputting and classifying event logs and producing end-of-day reports for the operation control center.
* Integrated rich text editor into application, adding over a dozen text functions, increasing ability to create custom and detail oriented reports by using Quill.js tool.
* Implemented ability to add frequently used templates to incident logs with keyboard shortcuts reducing input time by utilizing keyboard bindings.
* Integrated the ability to rapidly add search tags to incident log entries by using text auto-complete function improving data storage for optimal categorization and search-ability.
* Created database to store incident logs using SQL Alchemy and created tool to search through database with various criteria and display data in a quick and efficient manner.

## UI/UX Design

### Home Screen
![BART UI Design 1](/github-imgs/bart-7.png?raw=true "BART UI Design 1")

### Editor Screen
![BART UI Design 1](/github-imgs/bart-6.png?raw=true "BART UI Design 1")

### Log View Screen
![BART UI Design 1](/github-imgs/bart-8.png?raw=true "BART UI Design 1")


## Shift Log Work Bench by BART - Initial Release 1.0 

### Register new user to control center incident log system

![BART Login](/github-imgs/bart-login.png?raw=true "BART OCC Login")

### Control center incident logs current logs view

![BART Login](/github-imgs/bart-2.png?raw=true "BART OCC Current Logs")

### Add frequently used templates using keyboard bindings

![BART Login](/github-imgs/bart-3.png?raw=true "BART Keyboard Bindings")

### Rapidly add search tags using text auto-complete

![BART Login](/github-imgs/bart-4.png?raw=true "BART Add Search Tags")

### Search for incident logs using multiple parameters

![BART Login](/github-imgs/bart-5.png?raw=true "BART Search Logs")

## Technologies
* Python
* JavaScript
* Flask
* HTML
* mySQL
* ByCrpt
* Quill.js
* Awesomplete
* Cleave.js
* CSS
* BootStrap
