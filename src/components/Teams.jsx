import React from 'react';
import { Link } from 'react-router-dom';

const Teams = () => {
  const teams = [
    {
      id: 1,
      name: 'Manchester United',
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
      country: 'England'
    },
    {
      id: 2,
      name: 'Real Madrid',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
      country: 'Spain'
    },
    {
      id: 3,
      name: 'Bayern Munich',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_München_logo_%282017%29.svg',
      country: 'Germany'
    },
    {
      id: 4,
      name: 'Paris Saint-Germain',
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
      country: 'France'
    },
    {
       id: 5,
      name: 'AC Milan',
      logo: 'https://1000logos.net/wp-content/uploads/2016/10/AC-Milan-Logo-768x432.jpg', // Updated logo URL
      country: 'Italy'
    },
    {
      id: 6,
      name: 'Barcelona',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      country: 'Spain'
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold font-[Oswald] mb-8">Football Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link to={`/teams/${team.id}`} key={team.id}>
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <img
                src={team.logo}
                alt={`${team.name} logo`}
                className="w-24 h-24 mx-auto mb-4 object-contain"
              />
              <h2 className="text-xl font-semibold text-center">{team.name}</h2>
              <p className="text-gray-600 text-center">{team.country}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;