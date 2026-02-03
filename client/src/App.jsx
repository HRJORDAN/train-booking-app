import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tickets, setTickets] = useState([]);
  
  const [formData, setFormData] = useState({
    passenger_name: '',
    train_number: '',
    source: '',
    destination: '',
    journey_date: '',
    seats: 1,
    food_opted: false
  });

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${API_URL}/tickets`);
      setTickets(res.data);
    } catch (err) {
      console.error("Error connecting to server:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const bookTicket = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/book`, formData);

      setFormData({
        passenger_name: '', train_number: '', source: '', 
        destination: '', journey_date: '', seats: 1, food_opted: false
      });

      fetchTickets(); 
    } catch (err) {
      alert("Booking failed! Is the server running?");
      console.error(err);
    }
  };

  const cancelTicket = async (id) => {
    if(!confirm("Are you sure you want to cancel this ticket?")) return;
    try {
      await axios.delete(`${API_URL}/cancel/${id}`);
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">RailBharat</h1>
          <p className="text-slate-500 mt-1">HRJ.ORDAN TRAIN BOOKING PLATFORM</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-6">New Booking</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Passenger Name
                  </label>
                  <input 
                    required 
                    name="passenger_name" 
                    value={formData.passenger_name} 
                    onChange={handleChange} 
                    placeholder="Enter full name" 
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Train Number
                    </label>
                    <input 
                      required 
                      name="train_number" 
                      value={formData.train_number} 
                      onChange={handleChange} 
                      placeholder="12345" 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Journey Date
                    </label>
                    <input 
                      required 
                      type="date" 
                      name="journey_date" 
                      value={formData.journey_date} 
                      onChange={handleChange} 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      From
                    </label>
                    <input 
                      required 
                      name="source" 
                      value={formData.source} 
                      onChange={handleChange} 
                      placeholder="Source station" 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      To
                    </label>
                    <input 
                      required 
                      name="destination" 
                      value={formData.destination} 
                      onChange={handleChange} 
                      placeholder="Destination" 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Seats
                    </label>
                    <input 
                      required 
                      type="number" 
                      min="1" 
                      max="6" 
                      name="seats" 
                      value={formData.seats} 
                      onChange={handleChange} 
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                    <input 
                      type="checkbox" 
                      name="food_opted" 
                      checked={formData.food_opted} 
                      onChange={handleChange} 
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Add meal</span>
                  </label>
                </div>

                <button 
                  onClick={bookTicket}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm"
                >
                  Book Ticket
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-800">Your Bookings</h2>
              <span className="text-sm text-slate-500">{tickets.length} active</span>
            </div>
            
            {tickets.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <p className="text-slate-400">No bookings yet</p>
                <p className="text-sm text-slate-400 mt-1">Book your first ticket to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map(t => (
                  <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                              {t.train_number}
                            </span>
                            <span className="text-sm text-slate-500">
                              {t.journey_date ? new Date(t.journey_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800">{t.passenger_name}</h3>
                        </div>
                        <button 
                          onClick={() => cancelTicket(t.id)} 
                          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex-1">
                          <p className="text-sm text-slate-500 mb-1">From</p>
                          <p className="font-medium text-slate-800">{t.source}</p>
                        </div>
                        <div className="text-slate-300">→</div>
                        <div className="flex-1">
                          <p className="text-sm text-slate-500 mb-1">To</p>
                          <p className="font-medium text-slate-800">{t.destination}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">Seats:</span>
                          <span className="text-sm font-medium text-slate-800">{t.seats}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">Meal:</span>
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            t.food_opted 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {t.food_opted ? 'Included' : 'Not added'}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;