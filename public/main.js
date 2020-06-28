        const buton = document.getElementById("tikla");
        const butong = document.getElementById("gecmis");
        const text = document.getElementById("input");
        const div = document.getElementById("div");
        const ul = document.getElementById("list");
        let lis = document.querySelectorAll("#list li");
        let kayit =[],index,olus;

        let datat;
        
        async function loaddata(){
            let data = await getData();
            for(var i = 0 ; i < data.length;i++){
                console.log(data[i].icerik)
                olus = "<li>" + data[i].icerik +  "<button onclick='sil()'>Sil</button>"+ "<button onclick='ok()'>Yapıldı</button>"+"</li>";
                ul.innerHTML += olus;
            }
            lis = document.querySelectorAll("#list li");
            kayit2 = [];
            ekle();
        }

        buton.addEventListener('click', async() =>{
            if(text.value != ""){
                await a(text.value);
                olus = "<li>" + text.value +  "<button onclick='sil()'>Sil</button>"+ "<button onclick='ok()'>Yapıldı</button>"+"</li>";
                ul.innerHTML += olus;
            }
            lis = document.querySelectorAll("#list li");
            kayit2 = [];
            ekle();
            datat = await getData();
            console.log(datat);
        })
        
        function ok (){
            for(var i = 0 ; i < lis.length;i++){
                lis[i].onclick = function(e){
                    index = kayit2.indexOf(this.innerHTML);
                    this.classList.add("ok");
                }
            }
        }   

        function sil (){
            for(var i = 0 ; i < lis.length;i++){
                lis[i].onclick = async function(e){
                    index = kayit2.indexOf(this.innerHTML);
                    this.remove(e.target);
                    let char = this.innerHTML.split('<');
                    let ilk = char[0];
                    const data ={ilk};
                    const options={
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body:JSON.stringify(data)
                }
                const response = await fetch('/apii',options);
                const json = await response.json();
                console.log(json);
                }
            }
        }

        butong.addEventListener('click',  async () =>{
            div.innerHTML = "";
            let datas =await getData();
            for(var i = 0 ; i < datas.length;i++){
                div.innerHTML +=datas[i].icerik + " ";
            }
            
        })

        function ekle(){
            for(var i = 0 ; i < lis.length ; i++){
                kayit2.push(lis[i].innerHTML);
            }
        }
       
        async function a(value){
            let icerik   =  value;
            const data ={icerik}
            const options={
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(data)
            }

            const response = await fetch('/api',options);
            const json = await response.json();
            console.log(json);
        }
        
        async function getData(){
            const response = await fetch('/api');
            const data = await response.json();
            return data;
        }