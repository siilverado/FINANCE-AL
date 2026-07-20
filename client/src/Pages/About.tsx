/* eslint-disable import/no-absolute-path */
import { type FC } from 'react';

import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

import Aldo from '/aldo.png';
import Daniel from '/daniel.png';
import Eric from '/eric.png';
import Felipe from '/felipe.png';
import Nayib from '/nayib.png';

import Layout from '../Components/layout/Layout';

const team = [
  {
    id: 1,
    name: 'Felipe Suarez',
    description:
      'Desarrollador full stack, con capacidades de liderazgo, habilidad para dirigir y adapatarse a cualquier grupo de trabajo.',
    image: Felipe,
    linkedin: 'https://www.linkedin.com/in/suarez-felipe/',
    github: 'https://www.github.com/',
  },
  {
    id: 2,
    name: 'Eric Isnado',
    description:
      'Desarrollador full stack, con gran habilidad analítica y lógica capaz de encontrar soluciones a los problemas que se plantean y con alto interés en explorar los caminos de la programación.',
    image: Eric,
    linkedin: 'https://www.linkedin.com/in/eric-denis-laura-isnado-8a1027245/',
    github: 'https://www.github.com/recover1988',
  },
  {
    id: 3,
    name: 'Jonathan Daniel Arce',
    description:
      'Desarrollador full stack, siempre en búsqueda de nuevos conocimientos, con buenas habilidades para tratar con personas y trabajar en equipo.',
    image: Daniel,
    linkedin: 'https://www.linkedin.com/in/jonathandanielarce/',
    github: 'https://www.github.com/',
  },
  {
    id: 4,
    name: 'Aldo Ricardo Reygadas Hernández',
    description:
      'Desarrollador full stack, con experiencia en front end. Y conocimientos en backend con diferentes frameworks.',
    image: Aldo,
    linkedin: 'https://www.linkedin.com/in/Aldrick13/',
    github: 'https://www.github.com/',
  },
  {
    id: 5,
    name: 'Gonzalo Vasquez',
    description:
      'Desarrollador full stack, con alta capacidad de aprendizaje y habilidades para desarrollar de forma ágil y solucionar problemas con prontitud.',
    image: '#',
    linkedin: '#',
    github: 'https://www.github.com/',
  },
  {
    id: 6,
    name: 'Nayib Javier Sales',
    description:
      'UX Designer, siempre en búsqueda de mejorar y en aprendizaje constante para mantenerse a la vanguardia de las teconologías.',
    image: Nayib,
    linkedin: 'https://www.linkedin.com/in/nayib-sales-059623218/',
    github: 'https://www.github.com/',
  },
];

const About: FC = () => {
  return (
    <Layout title="Nosotros">
      <div className="w-full flex justify-center p-6 text-primary lg:p-14 font-roboto">
        <div className="w-5/6">
          <h1 className="title mb-4 text-2xl lg:text-4xl xl:text-5xl text-green-700">
            Sobre Nosotros
          </h1>
          <div className="text-base lg:text-lg text-justify text-green-700">
            <p>
              Somos un equipo de desarrolladores de
              <a
                href="https://www.nocountry.tech/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-green-800 hover:text-green-900 transition-colors"
              >
                &nbsp;No Country&nbsp;
              </a>
              cursando la etapa final del proyecto donde tenemos que desarrollar una aplicación en
              grupo cumpliendo diferentes objetivos propuestos por el bootcamp para mejorar nuestras
              capacidades como desarrolladores.
            </p>
            <p>
              Esta aplicación tiene como objetivo poner a disposicion de los usuarios diferentes
              campos donde puedan practicar deportes como canchas de futbol, basquet, tenis, etc.
              Además de brindar la posibilidad de poder reservarlas y que los propietarios puedan
              poner a disposicion sus propios campos deportivos.
            </p>
          </div>
          <h1 className="title my-6 text-2xl lg:text-4xl xl:text-5xl text-green-700">
            Nuestro Equipo
          </h1>
          <div className="grid auto-cols-fr lg:grid-cols-2 gap-5 text-pwgreen-50">
            {team.map((user) => {
              return (
                <div
                  className="flex flex-col lg:flex-row justify-content-center items-center gap-5 py-4 rounded-xl bg-primary text-white shadow-md hover:shadow-xl transition-all lg:p-8"
                  key={user.id}
                >
                  <div className="w-2/5">
                    <img
                      src={user.image}
                      alt="not found"
                      width={256}
                      height={256}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-3 justify-between w-3/5">
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p>{user.description}</p>
                    <div className="flex justify-end items-center gap-2 my-2">
                      <a className="text-5xl" href={user.github}>
                        <AiFillGithub className="transition-all hover:text-gradtwo" />
                      </a>
                      <a className="text-5xl" href={user.linkedin}>
                        <AiFillLinkedin className="transition-all hover:text-gradtwo" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
