for i in *{0..9}.html ; do
    [ -f "$i" ] || break
    i=${i:8}
    i=${i%".html"}
    LEN=${#i}
    if [ $LEN -gt 2 ] ; then
        echo "test1"
    elif [ $LEN -lt 2 ] ; then
        i="0$i"
    fi
    PATH="../ProjectEuler/A-XX/"
    if [ -d $PATH ] ; then
        echo "test2"
    fi
done