import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Clock, Users, Menu, X, Sun, Moon } from 'lucide-react';
import Teams from './components/teams';
import TeamDetails from './components/TeamDetails';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';

const SoccerApp = () => {
  const [ongoingMatches, setOngoingMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]); // New state for teams

  // Update the API configuration
  const API_KEY = '7d5b944a33e9456c8e5c377eb2d6309f'; // Directly use the API key for now
  const API_URL = 'https://api.football-data.org/v4/matches';
  const TEAMS_URL = 'https://api.football-data.org/v4/teams'; // New API URL for teams
  const DEMO_MODE = true; // Keep demo mode on during development

  useEffect(() => {
    fetchMatches();
    fetchTeams(); // Fetch teams on component mount
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loading screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);

      if (DEMO_MODE) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const demoData = getDemoData();
        setOngoingMatches(demoData.ongoing);
        setUpcomingMatches(demoData.upcoming);
        return;
      }

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'X-Auth-Token': API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const matches = data.matches || [];

      // Filter ongoing and upcoming matches
      const now = new Date();
      const ongoing = matches.filter(match =>
        match.status === 'IN_PLAY' || match.status === 'LIVE'
      );
      const upcoming = matches.filter(match =>
        new Date(match.utcDate) > now && match.status === 'SCHEDULED'
      ).slice(0, 8);

      setOngoingMatches(ongoing);
      setUpcomingMatches(upcoming);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch(TEAMS_URL, {
        method: 'GET',
        headers: {
          'X-Auth-Token': API_KEY,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setTeams(data.teams || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  };

  const getDemoData = () => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const dayAfter = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    return {
      ongoing: [
        {
          id: 1,
          homeTeam: { name: 'Manchester City', shortName: 'MCI' },
          awayTeam: { name: 'Liverpool', shortName: 'LIV' },
          score: { home: 2, away: 1 },
          minute: 73,
          competition: { name: 'Premier League' }
        },
        {
          id: 2,
          homeTeam: { name: 'Barcelona', shortName: 'BAR' },
          awayTeam: { name: 'Real Madrid', shortName: 'RMA' },
          score: { home: 1, away: 1 },
          minute: 45,
          competition: { name: 'La Liga' }
        }
      ],
      upcoming: [
        {
          id: 3,
          homeTeam: { name: 'Chelsea', shortName: 'CHE' },
          awayTeam: { name: 'Arsenal', shortName: 'ARS' },
          utcDate: tomorrow.toISOString(),
          competition: { name: 'Premier League' }
        },
        {
          id: 4,
          homeTeam: { name: 'Paris Saint-Germain', shortName: 'PSG' },
          awayTeam: { name: 'Marseille', shortName: 'OM' },
          utcDate: new Date(tomorrow.getTime() + 3 * 60 * 60 * 1000).toISOString(),
          competition: { name: 'Ligue 1' }
        },
        {
          id: 5,
          homeTeam: { name: 'Bayern Munich', shortName: 'BAY' },
          awayTeam: { name: 'Borussia Dortmund', shortName: 'BVB' },
          utcDate: dayAfter.toISOString(),
          competition: { name: 'Bundesliga' }
        },
        {
          id: 6,
          homeTeam: { name: 'Juventus', shortName: 'JUV' },
          awayTeam: { name: 'AC Milan', shortName: 'MIL' },
          utcDate: new Date(dayAfter.getTime() + 2 * 60 * 60 * 1000).toISOString(),
          competition: { name: 'Serie A' }
        }
      ]
    };
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return { date: formattedDate, time: formattedTime };
  };

  // Add scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Navbar component
  const Navbar = () => {
    const { user, login, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();

    return (
      <nav className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <Trophy className="h-8 w-8 text-green-600 mr-2" />
                <span className={`text-lg font-bold font-[Oswald] ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ScoreBoard
                </span>
              </Link>
            </div>

            {/* Desktop Menu with Auth and Theme Toggle */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`font-[Oswald] hover:text-green-600 px-3 py-2 text-lg font-semibold transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Live Matches
              </Link>
              <Link to="/" className={`font-[Oswald] hover:text-green-600 px-3 py-2 text-lg font-semibold transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Upcoming
              </Link>
              <Link to="/teams" className={`font-[Oswald] hover:text-green-600 px-3 py-2 text-lg font-semibold transition-colors ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                Teams
              </Link>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Auth Button */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-8 w-8 rounded-full"
                  />
                  <button
                    onClick={logout}
                    className={`text-sm font-medium hover:text-green-600 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={login}
                  className={`text-sm font-medium hover:text-green-600 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`hover:text-green-600 p-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className={`block px-3 py-2 hover:text-green-600 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Live Matches</Link>
                <Link to="/" className={`block px-3 py-2 hover:text-green-600 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Upcoming</Link>
                <Link to="/teams" className={`block px-3 py-2 hover:text-green-600 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Teams</Link>
                <div className="flex items-center justify-between px-3 py-2">
                  <button
                    onClick={toggleDarkMode}
                    className={`hover:text-green-600 ${darkMode ? 'text-white' : 'text-gray-700'}`}
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                  {user ? (
                    <button onClick={logout} className={`hover:text-green-600 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                      Logout
                    </button>
                  ) : (
                    <button onClick={login} className={`hover:text-green-600 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  const HeroSection = () => (
    <div id="live" className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-[Oswald] font-bold mb-4">
            Live Soccer Matches
          </h1>
          <p className="text-xl md:text-2xl font-[Oswald] text-green-100 max-w-3xl mx-auto">
            Stay updated with real-time scores and follow your favorite teams in action
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
            <p className="text-lg font-[Oswald]">Loading live matches...</p>
          </div>
        ) : ongoingMatches.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {ongoingMatches.map((match) => (
              <div key={match.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                    LIVE • {match.minute}'
                  </span>
                  <span className="text-green-100 text-sm">{match.competition.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <div className="text-lg font-semibold">{match.homeTeam.name}</div>
                    <div className="text-3xl font-bold mt-2">{match.score.home}</div>
                  </div>

                  <div className="mx-6 text-center">
                    <div className="text-2xl font-bold">VS</div>
                    <div className="w-12 h-0.5 bg-white/30 mt-2"></div>
                  </div>

                  <div className="text-center flex-1">
                    <div className="text-lg font-semibold">{match.awayTeam.name}</div>
                    <div className="text-3xl font-bold mt-2">{match.score.away}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto mb-4 text-green-200" />
            <h3 className="text-2xl font-semibold mb-2 font-[Oswald]">No Live Matches</h3>
            <p className="text-green-100 font-[Oswald]">Check back later for live soccer action!</p>
          </div>
        )}
      </div>
    </div>
  );

  const UpcomingSection = () => (
    <div id="upcoming" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-[Oswald] md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Matches
          </h2>
          <p className="text-lg font-[Oswald] text-gray-600 max-w-2xl mx-auto">
            Don't miss out on the exciting matches coming up. Mark your calendar!
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-lg text-gray-600 font-[Oswald]">Loading upcoming matches...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 font-[Oswald] mb-2">Unable to load matches</h3>
              <p className="text-red-600 mb-4 font-[Oswald]">Please check your connection and try again.</p>
              <p className="text-sm text-red-500font-[Oswald] mb-4">
                <strong>Note:</strong> This demo requires a free API key from football-data.org
              </p>
              <button
                onClick={fetchMatches}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : upcomingMatches.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingMatches.map((match) => {
              const { date, time } = formatDateTime(match.utcDate);
              return (
                <div key={match.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

                  <div className="p-6">
                    <div className="text-center mb-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {match.competition.name}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 mb-1">{match.homeTeam.name}</div>
                        <div className="text-2xl font-bold text-gray-400 my-2">VS</div>
                        <div className="font-semibold text-gray-900">{match.awayTeam.name}</div>
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <div className="flex items-center justify-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {date}
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-900 font-[Oswald] mb-2">No Upcoming Matches</h3>
            <p className="text-gray-600 font-[Oswald]">Check back later for new fixtures!</p>
          </div>
        )}
      </div>
    </div>
  );

  const TeamSection = () => (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-[Oswald] md:text-4xl font-bold text-gray-900 mb-4">
            Popular Teams
          </h2>
          <p className="text-lg font-[Oswald] text-gray-600 max-w-2xl mx-auto">
            Explore top football teams from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teams.slice(0, 6).map((team) => (
            <Link
              key={team.id}
              to={`/teams/${team.id}`}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className="h-32 w-32 mx-auto mb-4 object-contain"
                />
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {team.name}
                </h3>
                <p className="text-gray-600 text-center">{team.country}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/teams"
            className="inline-flex font-[Oswald] items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
          >
            View All Teams
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <>
      <HeroSection />
      <UpcomingSection />
      <TeamSection />
    </>
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white flex flex-col">
          <AnimatePresence mode='wait'>
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <Router>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col"
                >
                  {/* Scroll Progress Bar */}
                  <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
                    style={{ scaleX }}
                  />

                  {/* Navigation Header */}
                  <Navbar />

                  {/* Main Content */}
                  <motion.main
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex-grow"
                  >
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/teams" element={<Teams />} />
                      <Route path="/teams/:teamId" element={<TeamDetails />} />
                      <Route path="*" element={
                        <motion.div variants={pageVariants} className="text-center py-12">
                          <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
                          <Link to="/teams" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
                            Go to Teams
                          </Link>
                        </motion.div>
                      } />
                    </Routes>
                  </motion.main>

                  {/* Footer */}
                  <Footer />
                </motion.div>
              </Router>
            )}
          </AnimatePresence>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default SoccerApp;