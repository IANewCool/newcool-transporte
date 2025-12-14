'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Tipos de licencias de conducir
const LICENCIAS = [
  { clase: 'A1', descripcion: 'Taxis, colectivos, transporte escolar', edad: 20, vigencia: 4, costo: 35000 },
  { clase: 'A2', descripcion: 'Vehiculos de transporte de pasajeros (buses)', edad: 20, vigencia: 4, costo: 35000 },
  { clase: 'A3', descripcion: 'Vehiculos de carga (camiones)', edad: 18, vigencia: 6, costo: 35000 },
  { clase: 'A4', descripcion: 'Transporte de carga simple (hasta 3.500 kg)', edad: 18, vigencia: 6, costo: 28000 },
  { clase: 'A5', descripcion: 'Transporte de carga (hasta 3.500 kg, no profesional)', edad: 18, vigencia: 6, costo: 28000 },
  { clase: 'B', descripcion: 'Vehiculos particulares (automoviles)', edad: 18, vigencia: 6, costo: 28000 },
  { clase: 'C', descripcion: 'Motocicletas y similares', edad: 18, vigencia: 6, costo: 23000 },
  { clase: 'D', descripcion: 'Vehiculos motorizados agricolas y maquinaria', edad: 18, vigencia: 6, costo: 23000 },
  { clase: 'E', descripcion: 'Vehiculos de traccion animal', edad: 18, vigencia: 6, costo: 15000 },
  { clase: 'F', descripcion: 'Personas con discapacidad (vehiculos adaptados)', edad: 18, vigencia: 6, costo: 28000 }
];

// Plantas de revision tecnica por region
const PLANTAS_REVISION = [
  // Metropolitana
  { id: 1, nombre: 'SGS Chile - Maipu', direccion: 'Av. Pajaritos 6750', comuna: 'Maipu', region: 'Metropolitana', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-18:00' },
  { id: 2, nombre: 'Socovesa - La Florida', direccion: 'Av. Vicuna Mackenna 8560', comuna: 'La Florida', region: 'Metropolitana', telefono: '22 281 5600', horario: 'Lun-Sab 8:00-18:00' },
  { id: 3, nombre: 'SGS Chile - Pudahuel', direccion: 'Ruta 68 km 14', comuna: 'Pudahuel', region: 'Metropolitana', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-18:00' },
  { id: 4, nombre: 'Dekra - Las Condes', direccion: 'Av. Las Condes 12500', comuna: 'Las Condes', region: 'Metropolitana', telefono: '22 584 6100', horario: 'Lun-Vie 8:00-19:00' },
  { id: 5, nombre: 'TUV Rheinland - Santiago', direccion: 'Av. Matta 1060', comuna: 'Santiago', region: 'Metropolitana', telefono: '22 470 2200', horario: 'Lun-Sab 8:00-17:00' },
  { id: 6, nombre: 'SGS Chile - Puente Alto', direccion: 'Av. Concha y Toro 2901', comuna: 'Puente Alto', region: 'Metropolitana', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-18:00' },
  // Valparaiso
  { id: 7, nombre: 'SGS Chile - Valparaiso', direccion: 'Av. Argentina 1850', comuna: 'Valparaiso', region: 'Valparaiso', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-17:00' },
  { id: 8, nombre: 'Socovesa - Vina del Mar', direccion: '15 Norte 1050', comuna: 'Vina del Mar', region: 'Valparaiso', telefono: '32 297 5500', horario: 'Lun-Sab 8:00-17:00' },
  // Biobio
  { id: 9, nombre: 'SGS Chile - Concepcion', direccion: 'Av. Colon 3050', comuna: 'Concepcion', region: 'Biobio', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-17:00' },
  { id: 10, nombre: 'Dekra - Talcahuano', direccion: 'Av. Cristobal Colon 2800', comuna: 'Talcahuano', region: 'Biobio', telefono: '41 291 5000', horario: 'Lun-Vie 8:00-18:00' },
  // Otras regiones
  { id: 11, nombre: 'SGS Chile - Temuco', direccion: 'Av. Alemania 1250', comuna: 'Temuco', region: 'La Araucania', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-17:00' },
  { id: 12, nombre: 'SGS Chile - Puerto Montt', direccion: 'Ruta 5 Sur km 1015', comuna: 'Puerto Montt', region: 'Los Lagos', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-17:00' },
  { id: 13, nombre: 'SGS Chile - Antofagasta', direccion: 'Av. Pedro Aguirre Cerda 6500', comuna: 'Antofagasta', region: 'Antofagasta', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-17:00' },
  { id: 14, nombre: 'SGS Chile - La Serena', direccion: 'Ruta 5 Norte km 462', comuna: 'La Serena', region: 'Coquimbo', telefono: '600 828 0020', horario: 'Lun-Sab 8:00-17:00' },
];

const REGIONES = ['Todas', 'Metropolitana', 'Valparaiso', 'Biobio', 'La Araucania', 'Los Lagos', 'Antofagasta', 'Coquimbo'];

// Autopistas y TAG
const AUTOPISTAS = [
  { nombre: 'Autopista Central', operador: 'Grupo Abertis', tag: 'Pase Diario / TAG', tarifaBase: 500, web: 'www.autopistacentral.cl' },
  { nombre: 'Costanera Norte', operador: 'Grupo ACS', tag: 'TAG', tarifaBase: 700, web: 'www.costaneranorte.cl' },
  { nombre: 'Vespucio Norte', operador: 'Grupo Abertis', tag: 'TAG', tarifaBase: 400, web: 'www.vespucionorte.cl' },
  { nombre: 'Vespucio Sur', operador: 'Grupo Abertis', tag: 'TAG', tarifaBase: 350, web: 'www.vespuciosur.cl' },
  { nombre: 'Vespucio Oriente', operador: 'Sacyr', tag: 'TAG', tarifaBase: 600, web: 'www.vespuciooriente.cl' },
  { nombre: 'Tunel San Cristobal', operador: 'Costanera Norte', tag: 'TAG', tarifaBase: 1800, web: 'www.costaneranorte.cl' },
  { nombre: 'Autopista del Sol', operador: 'Grupo Abertis', tag: 'TAG', tarifaBase: 300, web: 'www.autopistadelsol.cl' },
  { nombre: 'Autopista Los Libertadores', operador: 'ISA', tag: 'TAG/Efectivo', tarifaBase: 2500, web: 'www.autopistadellibertador.cl' }
];

// Tarifas Metro Santiago
const METRO_TARIFAS = {
  horaPunta: { adulto: 800, estudiante: 230 },
  horaValle: { adulto: 720, estudiante: 230 },
  horaBaja: { adulto: 640, estudiante: 230 }
};

// Multas de transito
const MULTAS = [
  { infraccion: 'No usar cinturon de seguridad', utm: 1, gravedad: 'Menos grave' },
  { infraccion: 'Usar celular conduciendo', utm: 1.5, gravedad: 'Grave' },
  { infraccion: 'No respetar semaforo rojo', utm: 1.5, gravedad: 'Grave' },
  { infraccion: 'Conducir con 0.3-0.8 g/l alcohol', utm: 3, gravedad: 'Grave' },
  { infraccion: 'Conducir en estado de ebriedad (+0.8 g/l)', utm: 11, gravedad: 'Gravisima' },
  { infraccion: 'Exceso velocidad hasta 20 km/h', utm: 1, gravedad: 'Menos grave' },
  { infraccion: 'Exceso velocidad 20-30 km/h', utm: 1.5, gravedad: 'Grave' },
  { infraccion: 'Exceso velocidad mas de 30 km/h', utm: 3, gravedad: 'Gravisima' },
  { infraccion: 'No portar licencia de conducir', utm: 0.5, gravedad: 'Leve' },
  { infraccion: 'Documentos no vigentes', utm: 0.5, gravedad: 'Leve' },
  { infraccion: 'Estacionar en lugar prohibido', utm: 0.5, gravedad: 'Leve' },
  { infraccion: 'Conducir sin licencia', utm: 3, gravedad: 'Gravisima' }
];

// Valor UTM
const UTM_VALOR = 66561; // Diciembre 2024

export default function TransporteModule() {
  const [busqueda, setBusqueda] = useState('');
  const [regionFiltro, setRegionFiltro] = useState('Todas');
  const [seccionActiva, setSeccionActiva] = useState<'plantas' | 'licencias' | 'multas' | 'autopistas' | 'publico' | 'glosario'>('plantas');

  // Calculadora de multas
  const [multaSeleccionada, setMultaSeleccionada] = useState('');

  const plantasFiltradas = PLANTAS_REVISION.filter(p => {
    const coincideBusqueda = busqueda === '' ||
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.comuna.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRegion = regionFiltro === 'Todas' || p.region === regionFiltro;
    return coincideBusqueda && coincideRegion;
  });

  const calcularMulta = () => {
    const multa = MULTAS.find(m => m.infraccion === multaSeleccionada);
    if (!multa) return 0;
    return multa.utm * UTM_VALOR;
  };

  const formatearPesos = (valor: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 border-b border-emerald-500/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-3 block">🚗</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Transporte <span className="text-emerald-400">Chile</span>
            </h1>
            <p className="text-emerald-200/70">
              Revision tecnica, licencias, multas y transporte publico
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="bg-black/20 border-b border-emerald-500/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2">
            {[
              { id: 'plantas', label: '🔍 Plantas', sublabel: 'Rev. Tecnica' },
              { id: 'licencias', label: '🪪 Licencias', sublabel: 'Conducir' },
              { id: 'multas', label: '🧮 Multas', sublabel: 'Calculadora' },
              { id: 'autopistas', label: '🛣️ Autopistas', sublabel: 'TAG' },
              { id: 'publico', label: '🚌 Publico', sublabel: 'Metro/Bus' },
              { id: 'glosario', label: '📖 Glosario', sublabel: 'Terminos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSeccionActiva(tab.id as typeof seccionActiva)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  seccionActiva === tab.id
                    ? 'bg-emerald-500 text-black'
                    : 'text-emerald-200 hover:bg-emerald-500/20'
                }`}
              >
                <span className="block">{tab.label}</span>
                <span className="text-xs opacity-70">{tab.sublabel}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Plantas */}
        {seccionActiva === 'plantas' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscar Planta de Revision Tecnica
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-emerald-200 text-sm mb-2">Buscar por nombre o comuna</label>
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Ej: SGS, Maipu, Dekra..."
                    className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-emerald-200 text-sm mb-2">Region</label>
                  <select
                    value={regionFiltro}
                    onChange={(e) => setRegionFiltro(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    {REGIONES.map(r => (
                      <option key={r} value={r} className="bg-slate-800">{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-emerald-200/60">
                Mostrando {plantasFiltradas.length} de {PLANTAS_REVISION.length} plantas
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {plantasFiltradas.map((planta, i) => (
                <motion.div
                  key={planta.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur border border-emerald-500/20 rounded-xl p-5 hover:border-emerald-500/40 transition-all"
                >
                  <h3 className="font-bold text-white mb-2">{planta.nombre}</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>📍</span> {planta.direccion}, {planta.comuna}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>📞</span> {planta.telefono}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>🕐</span> {planta.horario}
                    </p>
                    <p className="text-gray-400 flex items-center gap-2">
                      <span>🗺️</span> Region {planta.region}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-6 border border-emerald-500/30">
              <h3 className="font-bold text-white mb-4">📋 Documentos para Revision Tecnica</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-emerald-400 font-medium mb-2">Documentos requeridos:</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Permiso de circulacion vigente</li>
                    <li>• Cedula de identidad del conductor</li>
                    <li>• Padron del vehiculo</li>
                  </ul>
                </div>
                <div>
                  <p className="text-emerald-400 font-medium mb-2">Costos aproximados:</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Automovil: $12.000 - $18.000</li>
                    <li>• Moto: $8.000 - $12.000</li>
                    <li>• Camioneta/SUV: $15.000 - $22.000</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Licencias de Conducir */}
        {seccionActiva === 'licencias' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Licencias de Conducir</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LICENCIAS.map((lic, i) => (
                <motion.div
                  key={lic.clase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur border border-emerald-500/20 rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-lg">
                      {lic.clase}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{lic.descripcion}</p>
                  <div className="space-y-1 text-xs">
                    <p className="text-gray-500">Edad minima: <span className="text-white">{lic.edad} anos</span></p>
                    <p className="text-gray-500">Vigencia: <span className="text-white">{lic.vigencia} anos</span></p>
                    <p className="text-gray-500">Costo aprox: <span className="text-emerald-400">{formatearPesos(lic.costo)}</span></p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-emerald-500/20">
                <h3 className="font-bold text-white mb-4">📝 Requisitos Primera Licencia</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Cedula de identidad vigente</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Certificado de antecedentes</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Certificado escuela de conductores</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Examen teorico aprobado</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Examen practico aprobado</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Examen psicotecnico</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-emerald-500/20">
                <h3 className="font-bold text-white mb-4">🔄 Renovacion de Licencia</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Cedula de identidad vigente</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Licencia anterior</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Examen psicotecnico</li>
                  <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Pago de derechos municipales</li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <p className="text-yellow-300 text-xs">
                    ⚠️ Se puede renovar hasta 6 meses antes del vencimiento
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Calculadora de Multas */}
        {seccionActiva === 'multas' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-emerald-500/20">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🧮</span> Calculadora de Multas
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-emerald-200 text-sm mb-2">Tipo de Infraccion</label>
                    <select
                      value={multaSeleccionada}
                      onChange={(e) => setMultaSeleccionada(e.target.value)}
                      className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="" className="bg-slate-800">Seleccione una infraccion</option>
                      {MULTAS.map((m, i) => (
                        <option key={i} value={m.infraccion} className="bg-slate-800">{m.infraccion}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {multaSeleccionada && (
                  <div className="mt-6 p-4 bg-red-500/20 rounded-xl">
                    <p className="text-red-200 text-sm mb-1">Monto de la Multa</p>
                    <p className="text-3xl font-bold text-white">{formatearPesos(calcularMulta())}</p>
                    <p className="text-xs text-red-200/60 mt-2">
                      {MULTAS.find(m => m.infraccion === multaSeleccionada)?.utm} UTM x {formatearPesos(UTM_VALOR)}
                    </p>
                    <p className="text-xs text-red-300 mt-1">
                      Gravedad: {MULTAS.find(m => m.infraccion === multaSeleccionada)?.gravedad}
                    </p>
                  </div>
                )}

                <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <p className="text-emerald-300 text-xs">
                    💡 UTM Diciembre 2024: {formatearPesos(UTM_VALOR)}
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-emerald-500/20">
                <h3 className="text-lg font-bold text-white mb-4">📋 Tabla de Multas Comunes</h3>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {MULTAS.map((multa, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${
                      multa.gravedad === 'Gravisima' ? 'bg-red-500/10 border-red-500/20' :
                      multa.gravedad === 'Grave' ? 'bg-orange-500/10 border-orange-500/20' :
                      multa.gravedad === 'Menos grave' ? 'bg-yellow-500/10 border-yellow-500/20' :
                      'bg-gray-500/10 border-gray-500/20'
                    }`}>
                      <div className="flex justify-between items-start">
                        <p className="text-white text-sm">{multa.infraccion}</p>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          multa.gravedad === 'Gravisima' ? 'bg-red-500/30 text-red-300' :
                          multa.gravedad === 'Grave' ? 'bg-orange-500/30 text-orange-300' :
                          multa.gravedad === 'Menos grave' ? 'bg-yellow-500/30 text-yellow-300' :
                          'bg-gray-500/30 text-gray-300'
                        }`}>{multa.gravedad}</span>
                      </div>
                      <p className="text-emerald-400 text-sm mt-1">{multa.utm} UTM = {formatearPesos(multa.utm * UTM_VALOR)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Autopistas y TAG */}
        {seccionActiva === 'autopistas' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Autopistas y TAG</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {AUTOPISTAS.map((auto, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur border border-emerald-500/20 rounded-xl p-5"
                >
                  <h3 className="font-bold text-white mb-2">{auto.nombre}</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-400">Operador: <span className="text-white">{auto.operador}</span></p>
                    <p className="text-gray-400">Sistema: <span className="text-emerald-400">{auto.tag}</span></p>
                    <p className="text-gray-400">Tarifa base: <span className="text-emerald-400">{formatearPesos(auto.tarifaBase)}</span></p>
                    <p className="text-gray-400">Web: <span className="text-blue-400">{auto.web}</span></p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl p-6 border border-blue-500/30">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span>🏷️</span> Obtener TAG
                </h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Cedula de identidad</li>
                  <li>• Padron del vehiculo</li>
                  <li>• Tarjeta de credito/debito</li>
                  <li>• Monto minimo de carga</li>
                </ul>
                <p className="text-xs text-blue-300 mt-3">Costo TAG: Gratis o desde $5.000</p>
              </div>

              <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 rounded-xl p-6 border border-orange-500/30">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span>💳</span> Pase Diario
                </h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Solo Autopista Central</li>
                  <li>• Valido por 24 horas</li>
                  <li>• Compra en Copec, Servipag</li>
                  <li>• Ingresar patente exacta</li>
                </ul>
                <p className="text-xs text-orange-300 mt-3">Costo: ~$8.000 por dia</p>
              </div>

              <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-xl p-6 border border-red-500/30">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <span>⚠️</span> Sin TAG
                </h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Se genera deuda automatica</li>
                  <li>• +30% recargo por pasada</li>
                  <li>• Notificacion por correo</li>
                  <li>• Bloqueo en permiso circulacion</li>
                </ul>
                <p className="text-xs text-red-300 mt-3">Consulta deudas: www.tagpass.cl</p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Transporte Publico */}
        {seccionActiva === 'publico' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Transporte Publico</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-emerald-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>🚇</span> Metro de Santiago
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-red-500/10 rounded-lg">
                    <p className="text-red-400 font-medium">Hora Punta (7:00-9:00 / 18:00-20:00)</p>
                    <p className="text-white">Adulto: {formatearPesos(METRO_TARIFAS.horaPunta.adulto)}</p>
                    <p className="text-gray-400 text-sm">Estudiante: {formatearPesos(METRO_TARIFAS.horaPunta.estudiante)}</p>
                  </div>
                  <div className="p-4 bg-yellow-500/10 rounded-lg">
                    <p className="text-yellow-400 font-medium">Hora Valle (9:00-18:00 / 20:00-20:45)</p>
                    <p className="text-white">Adulto: {formatearPesos(METRO_TARIFAS.horaValle.adulto)}</p>
                    <p className="text-gray-400 text-sm">Estudiante: {formatearPesos(METRO_TARIFAS.horaValle.estudiante)}</p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <p className="text-green-400 font-medium">Hora Baja (20:45-23:00 / Fines semana)</p>
                    <p className="text-white">Adulto: {formatearPesos(METRO_TARIFAS.horaBaja.adulto)}</p>
                    <p className="text-gray-400 text-sm">Estudiante: {formatearPesos(METRO_TARIFAS.horaBaja.estudiante)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-emerald-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>🚌</span> RED (ex Transantiago)
                </h3>

                <div className="space-y-4">
                  <div className="p-4 bg-emerald-500/10 rounded-lg">
                    <p className="text-emerald-400 font-medium">Tarifa Integrada</p>
                    <p className="text-white text-sm">Bus + Metro en 2 horas = 1 tarifa</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">Tarjetas disponibles:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-black/20 rounded text-center">
                        <p className="text-green-400 font-medium">BIP!</p>
                        <p className="text-gray-500 text-xs">Adulto</p>
                      </div>
                      <div className="p-2 bg-black/20 rounded text-center">
                        <p className="text-blue-400 font-medium">TNE</p>
                        <p className="text-gray-500 text-xs">Estudiante</p>
                      </div>
                      <div className="p-2 bg-black/20 rounded text-center">
                        <p className="text-purple-400 font-medium">Adulto Mayor</p>
                        <p className="text-gray-500 text-xs">+65 anos</p>
                      </div>
                      <div className="p-2 bg-black/20 rounded text-center">
                        <p className="text-orange-400 font-medium">Protegido</p>
                        <p className="text-gray-500 text-xs">Beneficiarios</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-6 border border-emerald-500/30">
              <h3 className="font-bold text-white mb-4">📱 Apps Utiles</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-black/20 rounded-lg">
                  <span className="text-3xl block mb-2">🚇</span>
                  <p className="text-white font-medium">Metro Santiago</p>
                  <p className="text-gray-500 text-xs">Estado de lineas</p>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg">
                  <span className="text-3xl block mb-2">🚌</span>
                  <p className="text-white font-medium">RED</p>
                  <p className="text-gray-500 text-xs">Recorridos y tiempos</p>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg">
                  <span className="text-3xl block mb-2">💳</span>
                  <p className="text-white font-medium">BIP! Movil</p>
                  <p className="text-gray-500 text-xs">Carga y saldo</p>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg">
                  <span className="text-3xl block mb-2">🗺️</span>
                  <p className="text-white font-medium">Moovit</p>
                  <p className="text-gray-500 text-xs">Planificador rutas</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Glosario de Transporte</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { termino: 'Revision Tecnica', definicion: 'Inspeccion obligatoria anual que certifica las condiciones mecanicas y de seguridad del vehiculo.' },
                { termino: 'Permiso de Circulacion', definicion: 'Autorizacion anual emitida por municipalidades que habilita a un vehiculo para transitar.' },
                { termino: 'SOAP', definicion: 'Seguro Obligatorio de Accidentes Personales. Cubre danos a personas en accidentes de transito.' },
                { termino: 'TAG', definicion: 'Dispositivo electronico para pago automatico de peajes en autopistas concesionadas.' },
                { termino: 'UTM', definicion: 'Unidad Tributaria Mensual. Valor de referencia para calcular multas e impuestos.' },
                { termino: 'Padron', definicion: 'Documento que acredita la propiedad del vehiculo y sus caracteristicas tecnicas.' },
                { termino: 'Licencia Clase B', definicion: 'Licencia para conducir vehiculos particulares de hasta 3.500 kg.' },
                { termino: 'Tarifa Integrada', definicion: 'Sistema que permite usar bus y metro con una sola tarifa en ventana de 2 horas.' },
                { termino: 'BIP!', definicion: 'Tarjeta de pago del transporte publico de Santiago (Metro y RED).' },
                { termino: 'TNE', definicion: 'Tarjeta Nacional Estudiantil. Da acceso a tarifa rebajada en transporte.' },
                { termino: 'Infraccion Gravisima', definicion: 'Falta grave al transito que implica suspension de licencia y multas elevadas.' },
                { termino: 'Homologacion', definicion: 'Proceso de certificacion de vehiculos importados para circular en Chile.' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 rounded-xl p-4 border border-emerald-500/20"
                >
                  <h3 className="font-bold text-emerald-400 mb-2">{item.termino}</h3>
                  <p className="text-gray-400 text-sm">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-500/20 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Transporte Chile - Parte de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-emerald-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Informacion referencial. Consulte fuentes oficiales para datos actualizados.
          </p>
        </div>
      </footer>
    </div>
  );
}
