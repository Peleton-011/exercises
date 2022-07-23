#!/bin/bash

#Get mode (0 -> not overwrite, 1 -> overwrite)
#echo -n "Select mode 1 -> Overwrite, 0 -> not"
#read -r CURRMODE
CURRMODE=1
for i in *{0..9}.html ; do
    #Do for all existing Problem-XX.html files
    echo "$i"
    [ -f "$i" ] || continue
    echo "$i"
    #Get file content and rase file
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
    echo "$i"
    echo "$ONUM"
    #Set tag
    printf -v TAG "\x$(printf %x $((HUNDRED+65)))"
    NAME="${TAG}-${i}"
    #Set path
    PROBLEM="../ProjectEuler/${NAME}"
    #Exit if it already exists
    [ "${CURRMODE}" -eq "1" ] && [ -d "${PROBLEM}" ] && echo "cum" && continue
    #Copy dir and edit insides
    echo "nem $NAME"
    echo "prog $PROBLEM"
    cp -r "../ProjectEuler/A-XX" "${PROBLEM}"
    cd "${PROBLEM}/" || { echo "Error changing directory" ; continue ; }
    mv "./A-XX.html" "./${NAME}.html" && echo "moved"
    sed -i "s/Exercice/Exercice ${ONUM}/g" "./${NAME}.html" && echo "edit1"
    echo "between edits"
    echo "${CONTENT}"
    #Add content to insides
    sed -i "s;Sample problem text;${CONTENT};g" "./${NAME}.html" && echo "edit2"
done