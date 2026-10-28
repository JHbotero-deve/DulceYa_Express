import React from 'react';
import { Star, Heart, Quote, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export const FamilyStories: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      author: 'Carolina & Mateo Botero',
      city: 'Medellín',
      relation: 'Sorpresa para su mamá en sus 60 años',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      quote:
        'Vivo en Madrid y no pude viajar para el cumpleaños de mamá. Con DulceYa Express le envié la Caja Sorpresa Familiar con fotos de sus nietos y la torta tres leches. ¡Nos hizo videollamada llorando de pura emoción! Gracias por acortar la distancia.',
      rating: 5,
      date: 'Hace 3 días'
    },
    {
      id: 2,
      author: 'Andrés Felipe Ramos',
      city: 'Bogotá',
      relation: 'Aniversario de bodas sorpresa',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      quote:
        'El servicio express es 100% real: pedí a las 2:15 PM y a las 2:58 PM ya estaba el repartidor con la caja de fresas con chocolate y oro y el globo de helio. Mi esposa quedó fascinada con el empaque impecable.',
      rating: 5,
      date: 'Hace 5 días'
    },
    {
      id: 3,
      author: 'Valeria & Familia Gómez',
      city: 'Cali',
      relation: 'Reunión familiar dominical',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      quote:
        'El cheesecake de maracuyá y los alfajores de maicena son de otro planeta. La textura suave que se deshace en la boca nos transportó a la repostería de nuestra abuela. Ya es tradición pedir en cada almuerzo familiar.',
      rating: 5,
      date: 'Ayer'
    }
  ];

  return (
    <section className="py-14 bg-[#FFFDF9] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Historias Reales de Hogares Felices</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Familias que Endulzaron sus Recuerdos
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600">
            Cada entrega de DulceYa Express lleva consigo un abrazo sincero, dedicatorias que conmueven y postres hechos con amor.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{t.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-amber-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{t.author}</h4>
                  <p className="text-[11px] text-rose-700 font-medium">{t.relation}</p>
                  <span className="text-[10px] text-stone-400">{t.city} · Verificado DulceYa</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Counter Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-amber-900 text-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-serif-display text-3xl sm:text-4xl font-bold text-amber-300">
              4,850+
            </div>
            <div className="text-xs text-amber-100 mt-1">Cajas Sorpresa Entregadas</div>
          </div>
          <div>
            <div className="font-serif-display text-3xl sm:text-4xl font-bold text-amber-300">
              &lt; 48 min
            </div>
            <div className="text-xs text-amber-100 mt-1">Tiempo Promedio de Entrega</div>
          </div>
          <div>
            <div className="font-serif-display text-3xl sm:text-4xl font-bold text-amber-300">
              4.9 / 5.0
            </div>
            <div className="text-xs text-amber-100 mt-1">Satisfacción Familiar</div>
          </div>
          <div>
            <div className="font-serif-display text-3xl sm:text-4xl font-bold text-amber-300">
              100%
            </div>
            <div className="text-xs text-amber-100 mt-1">Ingredientes Artesanales</div>
          </div>
        </div>
      </div>
    </section>
  );
};
