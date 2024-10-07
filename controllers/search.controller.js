import Hotel from "../models/hotel.js";
const searchHotel = async (req, res) => {
  try {
    const { fechaIni, fechaFin, search } = req.query;

    // Crear los criterios de búsqueda
    let query = {};

    // Filtro por nombre o dirección
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: "i" } }, // Insensible a mayúsculas/minúsculas
        { direccion: { $regex: search, $options: "i" } },
      ];
    }

    // Filtro por rango de fechas si ambos están presentes
    if (fechaIni && fechaFin) {
      query.fechaDisponibilidad = {
        $gte: new Date(fechaIni),
        $lte: new Date(fechaFin),
      };
    }

    // Realizar la búsqueda en la base de datos
    const hoteles = await Hotel.find(query);

    // Enviar los resultados
    res.status(200).json(hoteles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al realizar la búsqueda de hoteles" });
  }
};

export { searchHotel };
