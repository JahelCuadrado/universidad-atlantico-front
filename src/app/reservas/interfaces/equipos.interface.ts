export interface EquiposResponse {
  id:                 number;
  imagen:             string;
  nombre:             string;
  descripcion:        string;
  numero_equipo:      string;
  fecha_alta:         Date;
  fecha_modificacion: Date;
  disponible:         boolean;
  numero_clase:       string;
}
