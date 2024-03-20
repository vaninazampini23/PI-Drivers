module.exports = ({name,id,apellido,descripcion,imagen,nacionalidad,fechadenacimiento, Teams}) =>{
    const obj = {
        id: id,
        driverRef: apellido,
        name:{
            forename: name,
            surname: apellido
        },
        image:{
            url:imagen,
        },
        dob: fechadenacimiento,
        nationality: nacionalidad,
        teams: Teams.map(team => team.nombre).join(', '),
        description:descripcion
    }
    return obj;
}