const send = document.querySelector('.sendbtn');
const mesinp = document.querySelector('.mesinp');

const socket = io();

async function getusername() {
  const res = await axios.get('/username');

  send.addEventListener('click', (e) => {
    const Message = mesinp.value;
    if (Message === '') {
      return;
    }
    // console.log(Message);
    mesinp.value = '';
    socket.emit('send-msg', {
      msg: Message,
      name: res.data.name
    })
  })

}
getusername();

const box = document.querySelector('.chatbox');
socket.on('recieve-msg', (data) => {
  console.log(data);
  const div = document.createElement('div');
  const str = `<p><strong>${data.name}</strong> : ${data.msg}</p>`
  div.innerHTML=str;
  box.append(div);
})