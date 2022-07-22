for i in *{0..9}.html ; do
    [ -f "$i" ] || continue
    i=${i:8}
    i=${i%".html"}
    LEN=${#i}
    HUNDRED=$[$[i-$[i%100]]/100]
    if [ $LEN -gt 2 ] ; then
        i=${i:$[$LEN-2]}
    elif [ $LEN -lt 2 ] ; then
        i="0$i"
    fi
    printf -v TAG "\x$(printf %x $((${HUNDRED}+65)))"
    PATH="../ProjectEuler/${TAG}-${i}/"
    echo ${PATH}
    if [ -d $PATH ] ; then
        echo "test2"
    fi
done