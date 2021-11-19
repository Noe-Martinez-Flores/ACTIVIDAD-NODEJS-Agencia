const urlAutos = "http://localhost:4000/autos";
const urlMarcas = "http://localhost:4000/marca";

const listadoAutos = list => {
    let table = "";
    $('#tableAutos > tbody').empty();

    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            table += `
    <tr>
        <td>${i + 1}</td>
        <td>${list[i].nombre}</td>
        <td>${list[i].matricula}</td>
        <td>${list[i].añoVerificacion}</td>
        <td>${JSON.stringify(list[i].fechaRegistro)}</td>
        <td>${JSON.stringify(list[i].fechaActualizacion)}</td>
        <td>${list[i].status ? "Inactivo" : "Activo"}</td>
        <td>${list[i].marca}</td>
        
        <td>
            <button title="Detalles" onclick="getInfoAutos(${list[i].id});" type="button" class="btn btn-info" data-toggle="modal" data-target="#detailsAutos"> <i class="fas fa-info"></i> </button>
        </td>
        <td>
            <button title="Editar" onclick="getInfoUpdateAutos(${list[i].id});" type="button" class="btn btn-warning"  style="color: white;" data-toggle="modal" data-target="#updateAutos"><i class="far fa-edit"></i></button>
        </td>
        <td>
            <button title="Eliminar" onclick="getAutoId(${list[i].id});" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteAutos" ><i class="fas fa-trash"></i></button>
        </td>

    </tr>
    `;
        }
    } else {
        table = `
<tr class="text-center">
    <td colspan="5">No hay registros para mostrar</td>
</tr>
`;
    }
    $(`#tableAutos > tbody`).html(table);
};


const listadoMarcas = list => {
    let table = "";
    $('#tableMarcas > tbody').empty();

    if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
            table += `
    <tr>
        <td>${i + 1}</td>
        <td>${list[i].Nombre}</td>
        
        <td>
            <button title="Detalles" onclick="getInfoMarcas(${list[i].id});" type="button" class="btn btn-info" data-toggle="modal" data-target="#detailsMarcas"> <i class="fas fa-info"></i> </button>
        </td>
        <td>
            <button title="Editar" onclick="getInfoUpdateMarcas(${list[i].id});" type="button" class="btn btn-warning"  style="color: white;" data-toggle="modal" data-target="#updateMarcas"><i class="far fa-edit"></i></button>
        </td>
        <td>
            <button title="Eliminar" onclick="getMarcaId(${list[i].id});" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteMarcas" ><i class="fas fa-trash"></i></button>
        </td>

    </tr>
    `;
        }
    } else {
        table = `
<tr class="text-center">
    <td colspan="5">No hay registros para mostrar</td>
</tr>
`;
    }
    $(`#tableMarcas > tbody`).html(table);
};

const getAutos = async () =>{
    return await $.ajax({
        type: 'GET',
        url: urlAutos
    }).done(res => {
        listadoAutos(res.listAutos);
        body:JSON.stringify(res.listAutos);
        console.log(res.listAutos);
    });
}

const getMarcas = async () => {
    return await $.ajax({
        type: 'GET',
        url: urlMarcas
    }).done(res=>{
        listadoMarcas(res.listMarcas);
        body:JSON.stringify(res.listMarcas);
        console.log(res.listMarcas);
    });
}

const getAutoById = async (id) => {
    return await $.ajax({
        type: 'GET',
        url: urlAutos+'/'+id
    }).done (res => res);
}

const getMarcaById = async (id) => {
    return await $.ajax({
        type: 'GET',
        url: urlMarcas+'/'+id
    }).done (res => res);
}

const getInfoAutos = async (id) => {
    let auto = await getAutoById(id);
   
    document.getElementById('nombreDetails').value = auto.autos[0].nombre
    document.getElementById('matriculaDetails').value = auto.autos[0].matricula;
    document.getElementById('yearVerificationDetails').value = auto.autos[0].añoVerificacion;
    document.getElementById('yearRegisterDetails').value = auto.autos[0].fechaRegistro;
    document.getElementById('yearUpdateDetails').value = auto.autos[0].fechaActualizacion;
    document.getElementById('status').value = auto.autos[0].estado? "Activo" : "Inactivo";
    document.getElementById('marcaDetails').value = auto.autos[0].marca;

    console.log(auto);
}

const getInfoMarcas = async (id) => {
    let marca = await getMarcaById(id);
    
    document.getElementById('nameMarcasDetails').value = marca.marca[0].Nombre
    console.log(marca);
}

const getInfoUpdateAutos = async (id) => {
    let auto = await getAutoById(id);
    document.getElementById('idAutoUpdate').value = auto.autos[0].id
    document.getElementById('nameCarUpdate').value = auto.autos[0].nombre
    document.getElementById('matriculaUpdate').value = auto.autos[0].matricula;
    document.getElementById('yearVerificationUpdate').value = auto.autos[0].añoVerificacion;
    document.getElementById('yearRegisterUpdate').value = auto.autos[0].fechaRegistro;
    document.getElementById('marcaUpdate').value = auto.autos[0].marca;
}

const getInfoUpdateMarcas = async (id) => {
    let marca = await getMarcaById(id);
    document.getElementById('idMarcaUpdate').value = marca.marca[0].id
    document.getElementById('nombreMarcaUpdate').value = marca.marca[0].Nombre
    console.log(marca);
}

const getAutoId = async (id) => {
    document.getElementById('idAutoDelete').value = id;
}

const getMarcaId = async (id) => {
    document.getElementById('idMarcaDelete').value = id;
}

const registerCar = async () => {
    let nombre = document.getElementById('nameCarCreate').value;
    let matricula = document.getElementById('matriculaCreate').value;
    let añoVerificacion = document.getElementById('yearVerificationCreate').value;
    let fechaRegistro = document.getElementById('yearRegisterCreate').value;
    let marca = document.getElementById('marcaCreate').value;

    let object = {nombre,matricula,añoVerificacion,fechaRegistro,marca};
    console.log(object);

    await $.ajax({
        type: 'POST',
        url: urlAutos+'/create',
        data: object
    }).done (function(res){
        console.log(res);
        
    });
}

const registerMark = async () => {
    let Nombre = document.getElementById('nombreMarcaCreate').value;
    let object = {Nombre};
    console.log(object);

    await $.ajax({
        type: 'POST',
        url: urlMarcas+'/create',
        data: object
    }).done (function(res){
        console.log(res);
        
    });
}

const updateAutos = async () => {
    let id = document.getElementById('idAutoUpdate').value;
    let nombre = document.getElementById('nameCarUpdate').value;
    let matricula = document.getElementById('matriculaUpdate').value;
    let añoVerificacion = document.getElementById('yearVerificationUpdate').value;
    let fechaRegistro = document.getElementById('yearRegisterUpdate').value;
    let marca = document.getElementById('marcaUpdate').value;

    let object = {nombre,matricula,añoVerificacion,fechaRegistro,marca};
    console.log(object);
    
    await $.ajax({
        type: 'POST',
        url: urlAutos+'/update/'+id,
        data: object
    }).done (function(res){
        console.log(res);
        console.log(id)
    });
    
}

const updateMarcas = async () => {
    let id = document.getElementById('idMarcaUpdate').value
    let Nombre = document.getElementById('nombreMarcaUpdate').value;
    
    let object = {Nombre};
    console.log(object);
    console.log(id)
    
    await $.ajax({
        type: 'POST',
        url: urlMarcas+'/update/'+id,
        data: object
    }).done (function(res){
        console.log(res);
    });
}

const deleteAuto = async () => {
    let id = document.getElementById('idAutoDelete').value;
    await $.ajax({
        type: 'POST',
        url: urlAutos+'/delete/'+id,
       
    }).done (res => {
        console.log(res);
    });
}

const deleteMarca = async () => {
    let id = document.getElementById('idMarcaDelete').value;
    await $.ajax({
        type: 'POST',
        url: urlMarcas+'/delete/'+id,
        
    }).done (res => {
        console.log(res);
    });
}





getAutos();
getMarcas();
