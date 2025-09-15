import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Nosotros = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#232323] py-16 px-4">
      {/* Banner Section */}
      <div className="relative mb-16">
        <div className="h-96 bg-gradient-to-r from-[#ff9800] to-[#ff6f00] rounded-2xl overflow-hidden relative">
          <img 
            src="/images/bannerquienessomos.jpg" 
            alt="Banner Bar Chafi" 
            className="w-full h-full object-cover opacity-70"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-6xl font-bold text-white text-center">
              ¿QUIÉNES SOMOS?
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="text-gray-300 text-lg leading-relaxed space-y-4">
              <p>
                <span className="text-[#ff9800] font-bold">Bar Chafi</span> es un proyecto gastronómico 
                que nació en 2022 con la idea de ofrecer una experiencia lúdica y única a quienes nos visitan.
              </p>
              <p>
                A través de la colección de cartas de nuestro menú, invitamos a nuestros clientes a 
                acumularlas y, de esta manera, ganar increíbles descuentos o productos exclusivos de Chafi.
              </p>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h3>
              <p className="text-gray-300 leading-relaxed">
                Crear momentos únicos combinando gastronomía de calidad con una experiencia 
                de juego que hace que cada visita sea memorable y emocionante.
              </p>
            </div>

            <div className="pt-6">
              <h3 className="text-2xl font-bold text-white mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-[#ff9800] p-3 rounded-full hover:bg-[#ff6f00] transition-colors duration-300"
                >
                  <FaInstagram className="text-white text-xl" />
                </a>
                <a 
                  href="#" 
                  className="bg-[#ff9800] p-3 rounded-full hover:bg-[#ff6f00] transition-colors duration-300"
                >
                  <FaFacebook className="text-white text-xl" />
                </a>
                <a 
                  href="#" 
                  className="bg-[#ff9800] p-3 rounded-full hover:bg-[#ff6f00] transition-colors duration-300"
                >
                  <FaLinkedin className="text-white text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Image and Buttons */}
          <div className="text-center">
            <div className="mb-8">
              <img 
                src="/images/quienesomos2.jpg" 
                alt="Bar Chafi Interior" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/menu')}
                className="w-full max-w-xs bg-gradient-to-r from-[#ff9800] to-[#ff6f00] 
                         text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg 
                         hover:shadow-[#ff9800]/30 transition-all duration-300 block mx-auto"
              >
                VER MENÚ
              </button>
              <button 
                onClick={() => navigate('/album')}
                className="w-full max-w-xs bg-transparent border-2 border-[#ff9800] 
                         text-[#ff9800] py-4 rounded-xl font-semibold text-lg 
                         hover:bg-[#ff9800] hover:text-white transition-all duration-300 block mx-auto"
              >
                VER CARTAS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-800 p-8 rounded-2xl">
            <div className="text-4xl font-bold text-[#ff9800] mb-2">2022</div>
            <div className="text-white font-semibold">Año de Fundación</div>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl">
            <div className="text-4xl font-bold text-[#ff9800] mb-2">50+</div>
            <div className="text-white font-semibold">Cartas Coleccionables</div>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl">
            <div className="text-4xl font-bold text-[#ff9800] mb-2">1000+</div>
            <div className="text-white font-semibold">Clientes Satisfechos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
