export async function load(room) {
    const resp = await fetch(`/api/chatroom/get/${room}`, {
        METHOD: "GET"
    })
    const result = await resp.json();
    //let arr = []
    //for(let i of result) {
    //    arr.push(i.content)
//
    //}
   //console.log(arr)
   return result;
}