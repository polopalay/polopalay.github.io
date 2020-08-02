const config = {
    "apiKey": "AIzaSyAIYQGiQcSjZBw9LQ9LcR1yh8uDWtsMfgs",
    "authDomain": "data-492da.firebaseapp.com",
    "databaseURL": "https://data-492da.firebaseio.com",
    "projectId": "data-492da",
    "storageBucket": "data-492da.appspot.com",
    "messagingSenderId": "381903672681",
    "appId": "1:381903672681:web:813cffbc63da30d11f99f8",
    "measurementId": "G-CD4W02BEZ7"
};
let table;

async function start() {
    await init(config);
    firebase.auth().onAuthStateChanged(function (user) {
        if (user === null) {
            window.location.href = "/login";
        }
    });
}
async function load() {
    const data = await read("/");
    let count = 0;
    console.log(data.posts.map(element => { element = count; count++; return element; }));
    table = $('#tblData').DataTable({
        "paging": true,
        "info": true,
        "order": [2, "desc"],
        "lengthMenu": [20, 15, 10],
        "data": data.posts,
        "columns": [
            { "data": "title", "width": "30%" },
            { "data": "desciption", "width": "40%" },
            // {
            //     "data": "DateCreate",
            //     "render": function (data) {
            //         return dateDMY(data);
            //     }, "width": "20%"
            // },
            {
                "data": "id",
                "render": function (data) {
                    return `
                                    <div class="text-center">
                                        <button onclick=upsertPost(${data})  class="btn btn-success text-white" style="cursor:pointer">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button onclick=deletePost(${data}) class="btn btn-danger text-white" style="cursor:pointer">
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                   `;
                }, "width": "20%"
            }
        ]
    });
}
function upsertPost(id) {
    window.location.href = `/post/upsert?id=${id}`;
}
function deletePost(id) {
    console.log(id);
}
start();
load();