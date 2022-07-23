#!/bin/bash
for i in *{0..9}.html ; do
    #Do for all existing Problem-XX.html files
    [ -f "$i" ] || continue
    #Get problem number
    i=${i:8}
    i=${i%".html"}
    LEN=${#i}
    #Set correct number
    HUNDRED=$[$[i-$[i%100]]/100]
    if [ "$LEN" -gt 2 ] ; then
        i=${i:$[$LEN-2]}
    elif [ "$LEN" -lt 2 ] ; then
        i="0$i"
    fi
    #Set tag
    printf -v TAG "\x$(printf %x $((${HUNDRED}+65)))"
    #Set path and copy template to path
    PROBLEM="../ProjectEuler/${TAG}-${i}"
    cp -r ../ProjectEuler/A-XX "${PROBLEM}"
done