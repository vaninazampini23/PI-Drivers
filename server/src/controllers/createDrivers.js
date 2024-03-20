const { Driver, Team} = require('../db')

module.exports = async (req, res) => {
    try{
        const { name, surname, description, image, nationality, dob, teams} = req.body;
        if( !name || !surname || !description || !image || !dob || !nationality)
        return res.status(401).json({error:"Faltan datos"});
    const searchDriver = await Driver.findAll(
        {
            where: {
                name: name,
                apellido: surname,
                fechadenacimiento: dob
            }
        }
    )

    if (searchDriver.length !== 0) throw new Error ('Driver duplicado');

        const createdDriver = await Driver.create(
        {
            name,
            apellido: surname,
            descripcion: description,
            imagen: image,
            nacionalidad: nationality,
            fechadenacimiento: dob,
        },
        )
        const findedTeams = await Team.findAll({
            where:{
                nombre: teams
            }
        })
        const response = await createdDriver.setTeams(findedTeams)

        if(!findedTeams || !response)
        throw new Error ('Error al crear driver')

        return res.status(200).send('OK')
    }catch(err){
        return res.status(500).json({error :err.message})
    }

}