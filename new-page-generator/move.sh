#!/bin/bash
for i in *{0..9}.html ; do
    #Do for all existing Problem-XX.html files
    [ -f "$i" ] || continue
    #Get file content
    CONTENT=$(<"$i")
    #Get problem number
    i=${i:8}
    i=${i%".html"}
    ONUM=$i
    LEN=${#i}
    #Set correct number
    HUNDRED=$(($((i-$((i%100))))/100))
    if [ "$LEN" -gt 2 ] ; then
        i=${i:$((LEN-2))}
    elif [ "$LEN" -lt 2 ] ; then
        i="0$i"
    fi
    #Set tag
    printf -v TAG "\x$(printf %x $((HUNDRED+65)))"
    NAME="${TAG}-${i}"
    #Set path
    PROBLEM="../ProjectEuler/${NAME}"
    #Copy dir and edit insides
    cp -r ../ProjectEuler/A-XX "${PROBLEM}"
    cd "${PROBLEM}" || exit
    mv "./A-XX.html" "./${NAME}.html"
    sed "s/Exercice/Exercice ${ONUM}/" "./${NAME}.html"
    #Add content to insides
    sed "s/Sample problem text/${CONTENT}/" "../ProjectEuler/${NAME}/${NAME}.html"
done