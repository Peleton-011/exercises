for i in *{0..9}.html ; do
    [ -f "$i" ] || break
    i=${i:8}
    i=${i%".html"}
    if [ "${#i}" > "2" ] ; then
        echo "test1"
    else if [ "${#i}" < "2" ] ; then
        i=0$i
    fi
    PATH="../ProjectEuler"
    if [ -d "$PATH" ] ; then
        echo "test2"
    fi
    echo $i
    echo ${#i}
done