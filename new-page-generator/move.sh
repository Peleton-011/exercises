TARGETFOLDER="/home/peleton/Documents/GitHub/exercises/ProjectEuler"
for i in *{0..9}.html ; do
    [ -f "$i" ] || break
    i=${i:8}
    i=${i%".html"}
    if [ "${#i}" > "2" ]; then
        echo cock
    else if [ "${#i}" < "2" ]; then
        i=0$i
    fi
    PATH="$TARGETFOLDER"
    if [ -d "$PATH" ]; then
        echo cock
    fi
    echo $i
    echo ${#i}
done
echo cum