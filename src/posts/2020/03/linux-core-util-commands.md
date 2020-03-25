---
title: "CHEATSHEET: Linux Core Utility Commands"
author: Saikat Das
tags:
  - reference
  - cheatsheet
  - linux
  - bash
  - command-line
  - shell
  - terminal
date: "2020-03-15"
icon: "bash.svg"
---

## Simple Commands

- `date` - displays the current time and date
- `cal` - displays a calendar of the current month
- `df` - displays the current amount of free space on our disk drives
- `free` - displays the amount of free memory
- `exit` - ends a terminal session

## Navigation Commands

- `pwd` - display the current working directory
- `cd` - change current working directory to another specified directory

### Linux Path names

Linux path names can be specified in the following two ways:

- absolute path names - specify the path name from the root (`/`) directory
- relative path names - specify the path name from the current directory using dot notation
  - `.` - refers to the current directory
  - `..` - refers to the parent directory of the current directory
  - `~` - refers to the current user's home directory

## Filesystem commands

- `file` - determine file type
- `less` - view contents of a file
- `ls` - list files and directories in a specific directory

### `ls` common arguments

- `-a` - lists all files
- `-h` - display file sizes in human-readable format
- `-l` - display long format results
- `-s` - sort by file size, largest first
- `-t` - sort by modified time, newest first

## Manipulating Files and Directories

- `cp` - copy files and directories
- `mv` - move/rename files and directories
- `mkdir` - create directories
- `rm` - remove files and directories
- `ln` - create _hard_ and _symbolic_ links
- `alias` - create an alias for a command. Use `unalias` to remove an _aliased_ command

### `cp`, `mv` & `rm` common arguments

- `-a` - copy the files and directories and all of their attributes
- `-i` - before overwriting an existing file, prompt the user for confirmation
- `-r` - recursively copy directories and their contents
- `-u` - when copying, only copy files that don't exist or are newer than the existing corresponding files in the destination directory
- `-v` - display informative messages as the copy is performed

## Getting help

- `type` - indicate how a command name is interpreted
- `which` - display which executable program will be executed
- `help` - get help for shell builtins
- `man` - display a command's manual page
- `apropos` - display a list of appropriate commands
- `info` - display a command's info entry
- `whatis` - display one-line manual page descriptions

## Parsing Text

- `cat` - concatenate files to the standard output
- `sort` - sort lines of text
- `uniq` - report or omit repeated lines
- `grep` - print lines matching a pattern
- `wc` - print _newline_, _word_ and _byte counts_ for each file
- `head` - output the first part of a file
- `tail` - output the last part of a file
