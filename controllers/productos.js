import { productoModel } from "../models/producto.js";
import {
  validateProducto,
  validateParcialProducto,
} from "../Schemas/productos.js";

export class productoController {
  static async getAll(req, res) {
    try {
      const producto = await productoModel.findAll();
      if (!producto) {
        res.status(404).json({ error: "No se encontraron productos" });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener los productos",
        error: error.message,
      });
    }
  }

  static async getById(req, res) {
    try {
      const producto = await productoModel.findByPk(req.params.id);
      if (!producto) {
        res.status(404).json({ error: "No se encontro el producto" });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de obtener el producto",
        error: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const result = validateProducto(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      }
      await productoModel.create(result.data);
      res.json({ msg: "Producto creado" }).status(201);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de crear el producto",
        error: error.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const result = validateParcialProducto(req.body);
      if (result.error) {
        res
          .status(400)
          .json({ msg: "Error ingreso de datos", error: result.error.errors });
      }
      await productoModel.update(result.data, {
        where: { id: req.params.id },
      });
      res
        .json({
          msg: "Producto actualizado",
        })
        .status(200);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de actualizar el producto",
        error: error.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const producto = await productoModel.findByPk(req.params.id);
      if (!producto) {
        res.status(400).json({ msg: "No existe el producto" });
      }
      await producto.destroy();
      res.json({ msg: "Producto eliminado" }).status(200);
    } catch (error) {
      res.status(500).json({
        msg: "Ocurrio un error a la hora de eliminar el producto",
        error: error.message,
      });
    }
  }
}
