import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

const TeamDetails = () => {
  const { teamId } = useParams();
  
  // Add scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const teams = {
    1: {
      name: 'Manchester United',
      coach: { name: 'Erik ten Hag', nationality: 'Netherlands' },
      captain: { name: 'Bruno Fernandes', position: 'Midfielder', number: 8 },
      players: [
        // Goalkeepers
        { id: 1, name: 'André Onana', position: 'Goalkeeper', number: 24 },
        { id: 2, name: 'Altay Bayindir', position: 'Goalkeeper', number: 1 },
        // Defenders
        { id: 3, name: 'Raphaël Varane', position: 'Defender', number: 19 },
        { id: 4, name: 'Harry Maguire', position: 'Defender', number: 5 },
        { id: 5, name: 'Lisandro Martínez', position: 'Defender', number: 6 },
        { id: 6, name: 'Luke Shaw', position: 'Defender', number: 23 },
        // Midfielders
        { id: 7, name: 'Bruno Fernandes', position: 'Midfielder', number: 8 },
        { id: 8, name: 'Casemiro', position: 'Midfielder', number: 18 },
        { id: 9, name: 'Mason Mount', position: 'Midfielder', number: 7 },
        // Forwards
        { id: 10, name: 'Marcus Rashford', position: 'Forward', number: 10 },
        { id: 11, name: 'Rasmus Højlund', position: 'Forward', number: 11 },
        { id: 12, name: 'Antony', position: 'Forward', number: 21 }
      ]
    },
    2: {
      name: 'Real Madrid',
      coach: { name: 'Carlo Ancelotti', nationality: 'Italy' },
      captain: { name: 'Nacho', position: 'Defender', number: 6 },
      players: [
        // Goalkeepers
        { id: 1, name: 'Thibaut Courtois', position: 'Goalkeeper', number: 1 },
        { id: 2, name: 'Kepa Arrizabalaga', position: 'Goalkeeper', number: 25 },
        // Defenders
        { id: 3, name: 'Éder Militão', position: 'Defender', number: 3 },
        { id: 4, name: 'David Alaba', position: 'Defender', number: 4 },
        { id: 5, name: 'Nacho', position: 'Defender', number: 6 },
        { id: 6, name: 'Dani Carvajal', position: 'Defender', number: 2 },
        // Midfielders
        { id: 7, name: 'Luka Modric', position: 'Midfielder', number: 10 },
        { id: 8, name: 'Toni Kroos', position: 'Midfielder', number: 8 },
        { id: 9, name: 'Federico Valverde', position: 'Midfielder', number: 15 },
        // Forwards
        { id: 10, name: 'Vinicius Jr', position: 'Forward', number: 7 },
        { id: 11, name: 'Rodrygo', position: 'Forward', number: 11 },
        { id: 12, name: 'Jude Bellingham', position: 'Midfielder', number: 5 }
      ]
    },
    3: {
      name: 'Bayern Munich',
      coach: { name: 'Thomas Tuchel', nationality: 'Germany' },
      captain: { name: 'Manuel Neuer', position: 'Goalkeeper', number: 1 },
      players: [
        // Goalkeepers
        { id: 1, name: 'Manuel Neuer', position: 'Goalkeeper', number: 1 },
        { id: 2, name: 'Sven Ulreich', position: 'Goalkeeper', number: 26 },
        // Defenders
        { id: 3, name: 'Dayot Upamecano', position: 'Defender', number: 2 },
        { id: 4, name: 'Kim Min-jae', position: 'Defender', number: 3 },
        { id: 5, name: 'Alphonso Davies', position: 'Defender', number: 19 },
        // Midfielders
        { id: 6, name: 'Joshua Kimmich', position: 'Midfielder', number: 6 },
        { id: 7, name: 'Leon Goretzka', position: 'Midfielder', number: 8 },
        // Forwards
        { id: 8, name: 'Harry Kane', position: 'Forward', number: 9 },
        { id: 9, name: 'Leroy Sané', position: 'Forward', number: 10 },
        { id: 10, name: 'Jamal Musiala', position: 'Forward', number: 42 }
      ]
    },
    4: {
      name: 'Paris Saint-Germain',
      coach: { name: 'Luis Enrique', nationality: 'Spain' },
      captain: { name: 'Marquinhos', position: 'Defender', number: 5 },
      players: [
        // Goalkeepers
        { id: 1, name: 'Gianluigi Donnarumma', position: 'Goalkeeper', number: 99 },
        { id: 2, name: 'Keylor Navas', position: 'Goalkeeper', number: 1 },
        
        // Defenders
        { id: 3, name: 'Marquinhos', position: 'Defender', number: 5 },
        { id: 4, name: 'Lucas Hernández', position: 'Defender', number: 21 },
        { id: 5, name: 'Achraf Hakimi', position: 'Defender', number: 2 },
        { id: 6, name: 'Milan Škriniar', position: 'Defender', number: 37 },
        
        // Midfielders
        { id: 7, name: 'Warren Zaïre-Emery', position: 'Midfielder', number: 33 },
        { id: 8, name: 'Vitinha', position: 'Midfielder', number: 17 },
        { id: 9, name: 'Manuel Ugarte', position: 'Midfielder', number: 4 },
        
        // Forwards
        { id: 10, name: 'Kylian Mbappé', position: 'Forward', number: 7 },
        { id: 11, name: 'Ousmane Dembélé', position: 'Forward', number: 10 },
        { id: 12, name: 'Randal Kolo Muani', position: 'Forward', number: 23 }
      ]
    },
    5: {
      name: 'AC Milan',
      coach: { name: 'Stefano Pioli', nationality: 'Italy' },
      captain: { name: 'Davide Calabria', position: 'Defender', number: 2 },
      players: [
        // Goalkeepers
        { id: 1, name: 'Mike Maignan', position: 'Goalkeeper', number: 16 },
        { id: 2, name: 'Marco Sportiello', position: 'Goalkeeper', number: 57 },
        
        // Defenders
        { id: 3, name: 'Theo Hernández', position: 'Defender', number: 19 },
        { id: 4, name: 'Fikayo Tomori', position: 'Defender', number: 23 },
        { id: 5, name: 'Davide Calabria', position: 'Defender', number: 2 },
        { id: 6, name: 'Simon Kjær', position: 'Defender', number: 24 },
        
        // Midfielders
        { id: 7, name: 'Ruben Loftus-Cheek', position: 'Midfielder', number: 8 },
        { id: 8, name: 'Tijjani Reijnders', position: 'Midfielder', number: 14 },
        { id: 9, name: 'Yunus Musah', position: 'Midfielder', number: 80 },
        
        // Forwards
        { id: 10, name: 'Rafael Leão', position: 'Forward', number: 10 },
        { id: 11, name: 'Olivier Giroud', position: 'Forward', number: 9 },
        { id: 12, name: 'Christian Pulisic', position: 'Forward', number: 11 }
      ]
    },
    6: {
      name: 'Barcelona',
      coach: { name: 'Xavi', nationality: 'Spain' },
      captain: { name: 'Sergi Roberto', position: 'Midfielder', number: 20 },
      players: [
        // Goalkeepers
        { id: 1, name: 'Marc-André ter Stegen', position: 'Goalkeeper', number: 1 },
        { id: 2, name: 'Iñaki Peña', position: 'Goalkeeper', number: 13 },
        
        // Defenders
        { id: 3, name: 'João Cancelo', position: 'Defender', number: 2 },
        { id: 4, name: 'Ronald Araújo', position: 'Defender', number: 4 },
        { id: 5, name: 'Iñigo Martínez', position: 'Defender', number: 5 },
        { id: 6, name: 'Jules Koundé', position: 'Defender', number: 23 },
        
        // Midfielders
        { id: 7, name: 'Pedri', position: 'Midfielder', number: 8 },
        { id: 8, name: 'Frenkie de Jong', position: 'Midfielder', number: 21 },
        { id: 9, name: 'Gavi', position: 'Midfielder', number: 6 },
        
        // Forwards
        { id: 10, name: 'Robert Lewandowski', position: 'Forward', number: 9 },
        { id: 11, name: 'Raphinha', position: 'Forward', number: 11 },
        { id: 12, name: 'João Félix', position: 'Forward', number: 14 }
      ]
    }
  };

  const team = teams[teamId];

  if (!team) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600">Team not found</h1>
        <Link to="/teams" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Back to Teams
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="container mx-auto p-4 font-sans"
      >
        {/* Header Section */}
        <motion.div 
          variants={scrollVariants}
          className="sticky top-0 bg-white/80 backdrop-blur-sm z-40 py-4 mb-8"
        >
          <Link to="/teams" className="text-gray-700 hover:text-gray-900 inline-flex items-center space-x-2">
            <span>←</span>
            <span className="font-medium">Back to Teams</span>
          </Link>
          <h1 className="text-4xl font-bold mt-4 text-gray-800 tracking-tight">{team.name}</h1>
        </motion.div>

        {/* Team Management */}
        <motion.section 
          variants={scrollVariants}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Team Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coach Card */}
            <motion.div 
              variants={scrollVariants}
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl shadow-xl p-8 
                        relative overflow-hidden before:absolute before:inset-0 before:bg-blue-500/10 before:z-0"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Head Coach</h3>
                <p className="text-2xl font-medium text-gray-700 mb-2">{team.coach.name}</p>
                <p className="text-sm text-gray-600">Nationality: {team.coach.nationality}</p>
              </div>
            </motion.div>
            
            {/* Captain Card */}
            <motion.div 
              variants={scrollVariants}
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl shadow-xl p-8 
                        relative overflow-hidden before:absolute before:inset-0 before:bg-amber-500/10 before:z-0"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Team Captain</h3>
                <p className="text-2xl font-medium text-gray-700 mb-2">{team.captain.name}</p>
                <p className="text-sm text-gray-600">Position: {team.captain.position}</p>
                <p className="text-sm text-gray-600">Number: {team.captain.number}</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Squad List */}
        <motion.section
          variants={scrollVariants}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Squad List</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.players.map((player, index) => (
              <motion.div 
                key={player.id}
                variants={scrollVariants}
                viewport={{ once: true }}
                custom={index}
                whileHover={{ scale: 1.02 }}
                className={`backdrop-blur-md bg-white/30 border border-white/40 rounded-xl shadow-lg p-6 
                          relative overflow-hidden
                          ${
                            player.position === 'Goalkeeper' ? 'before:bg-emerald-500/10' :
                            player.position === 'Defender' ? 'before:bg-rose-500/10' :
                            player.position === 'Midfielder' ? 'before:bg-violet-500/10' :
                            'before:bg-amber-500/10'
                          } before:absolute before:inset-0 before:z-0`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">{player.name}</h3>
                  <p className="text-sm font-medium text-gray-600">Position: {player.position}</p>
                  <p className="text-sm text-gray-600">Number: {player.number}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default TeamDetails;