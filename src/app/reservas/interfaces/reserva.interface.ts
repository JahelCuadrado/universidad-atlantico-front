export interface Reserva {
  usuario:          number;
  motivo_prestamo:  string;
  fecha_devolucion: Date;
  devuelto:         boolean;
  equipo:           number[];
  clase:            string[];
  material:         string[];
}
