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
const database = new Database(config, true);
let table;
load();

async function load() {
    let index = 0;
    $('#tblData').DataTable({
        "paging": true,
        "info": true,
        "order": [2, "desc"],
        "ajax": "https://data-492da.firebaseio.com/posts.json",
        "columns": [
            { "data": "title", "width": "30%" },
            { "data": "description", "width": "30%" },
            { "data": "date", "width": "20%" },
            {
                "render": function () {
                    const element = `<div class="text-center">
                                <button onclick=upsertPost(${index})  class="btn btn-sm btn-success text-white" style="cursor:pointer">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick=deletePost(${index}) class="btn btn-sm btn-danger text-white" style="cursor:pointer">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                              </div>`;
                    index++;
                    return element;
                }, "width": "20%"
            }
        ]
    });
}
function upsertPost(index) {
    window.location.href = `/post/upsert/?index=${index}`;
}
async function deletePost(index) {
    await database.deleteList("/posts/data/", index);
    $('#tblData').DataTable().ajax.reload();
    $('#tblData').DataTable().ajax.reload();
}
