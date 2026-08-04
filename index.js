import express from 'express'

const app = express()

app.use(express.json())

let notas = []




app.post('/notas', (req, res) => {
    console.log("BODY:", req.body)
    
    const { titulo, descripcion, estado } = req.body

    const nuevaNota = {
        id: notas.length + 1,
        titulo,
        descripcion,
        estado
    }

    notas.push(nuevaNota)

    res.json({
        msg: "Nota agregada",
        nota: nuevaNota
    })
})

app.get('/notas', (req, res) => {
    res.json(notas)
    console.log(notas)
})


app.get('/notas/completadas', (req, res) => {
    const resultado = notas.filter(n => n.estado === "completada")
    res.json(resultado)
})


app.get('/notas/encurso', (req, res) => {
    const resultado = notas.filter(n => n.estado === "en curso")
    res.json(resultado)
})


app.get('/notas/pendientes', (req, res) => {
    const resultado = notas.filter(n => n.estado === "pendiente")
    res.json(resultado)
})


app.put('/notas/:id', (req, res) => {
    const { id } = req.params
    const { titulo, descripcion, estado } = req.body

    const nota = notas.find(n => n.id == id)

    if (!nota) {
        return res.status(404).json({ msg: "Nota no encontrada" })
    }
    nota.titulo = titulo || nota.titulo
    nota.descripcion = descripcion || nota.descripcion
    nota.estado = estado || nota.estado
    
    res.json({
        msg: "Nota editada",
        nota
    })
})


app.put('/notas/:id/estado', (req, res) => {
    const { id } = req.params
    const { estado } = req.body

    const nota = notas.find(n => n.id == id)

    if (!nota) {
        return res.status(404).json({ msg: "Nota no encontrada" })
    }

    nota.estado = estado

    res.json({
        msg: "Estado actualizado",
        nota
    })
})


app.delete('/notas/:id', (req, res) => {
    const { id } = req.params

    const index = notas.findIndex(n => n.id == id)

    if (index === -1) {
        return res.status(404).json({ msg: "Nota no encontrada" })
    }

    notas.splice(index, 1)

    res.json({
        msg: "Nota eliminada"
    })
})


app.listen(4000, () => {
    console.log('Servidor en http://localhost:4000')
})
