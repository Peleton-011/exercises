#!/bin/bash

#Get mode (0 -> not overwrite, 1 -> overwrite)
#echo -n "Select mode 1 -> Overwrite, 0 -> not"
#read -r CURRMODE
CURRMODE=1

for i in *{0..9}.html ; do
    cd "../../new-page-generator" 
    #Do for all existing Problem-XX.html files
    [ -f "$i" ] || continue
    #Get file content and erase file
    CONTENT=$(<"$i")
    rm "${i}"
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
    #Exit if it already exists
    [ "${CURRMODE}" -eq "1" ] && [ -d "${PROBLEM}" ] && continue
    #Copy dir and edit insides
    cp -r "../ProjectEuler/A-XX" "${PROBLEM}"
    cd "${PROBLEM}/" || echo "Error changing dir"
    mv "./A-XX.html" "./${NAME}.html"
    sed -i "s/Exercice/Exercice ${ONUM}/g" "./${NAME}.html"
    #Add content to insides
    sed -i "s#Sample problem text#${CONTENT}#g" "./${NAME}.html"
done