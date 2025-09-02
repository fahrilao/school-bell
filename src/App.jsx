import React, { useState, useEffect } from "react";
import "./App.css";
import CurrentTime from "./components/CurrentTime";
import ScheduleList from "./components/ScheduleList";
import AddScheduleModal from "./components/AddScheduleModal";
import BellStatus from "./components/BellStatus";
import DayFilter from "./components/DayFilter";
import { playBell } from "./utils/bellUtils";
import {
  saveSchedulesToStorage,
  loadSchedulesFromStorage,
  isStorageAvailable,
} from "./utils/storageUtils";

function App() {
  const [schedules, setSchedules] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bellRinging, setBellRinging] = useState(false);
  const [ringingSchedule, setRingingSchedule] = useState("");
  const [lastTriggered, setLastTriggered] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null); // null means show all days

  // Load schedules from localStorage on component mount
  useEffect(() => {
    if (isStorageAvailable()) {
      const loadedSchedules = loadSchedulesFromStorage();
      setSchedules(loadedSchedules);
      setIsInitialized(true);
    }
  }, []);

  // Save schedules to localStorage whenever schedules change (but not on initial load)
  useEffect(() => {
    if (isInitialized && isStorageAvailable()) {
      saveSchedulesToStorage(schedules);
    }
  }, [schedules, isInitialized]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    setSelectedDay(currentDay);

    return () => clearInterval(timer);
  }, []);

  // Check for scheduled bells
  useEffect(() => {
    const checkSchedules = () => {
      const now = new Date();
      const currentTimeString = now.toTimeString().slice(0, 5); // HH:MM format
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

      schedules.forEach((schedule) => {
        if (
          schedule.enabled &&
          schedule.time === currentTimeString &&
          schedule.day === currentDay &&
          lastTriggered !== `${schedule.id}-${currentTimeString}`
        ) {
          setBellRinging(true);
          playBell(schedule.repetitions || 1);
          setLastTriggered(`${schedule.id}-${currentTimeString}`);

          // Stop bell animation after 3 seconds
          setRingingSchedule(schedule.name);
          setTimeout(() => {
            setBellRinging(false);
          }, 5000);
        }
      });
    };

    const interval = setInterval(checkSchedules, 1000);
    return () => clearInterval(interval);
  }, [schedules, lastTriggered]);

  const addSchedule = (newSchedule) => {
    // Generate separate schedule entries for each selected day
    const newSchedules = newSchedule.days.map((day) => ({
      id: Date.now() + day, // Unique ID for each day
      name: newSchedule.name,
      time: newSchedule.time,
      day: day, // Single day instead of array
      bellSound: newSchedule.bellSound || "./bell.mp3", // Store bell sound path
      repetitions: newSchedule.repetitions || 1,
      enabled: true,
    }));

    setSchedules([...schedules, ...newSchedules]);
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const toggleSchedule = (id) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id
          ? { ...schedule, enabled: !schedule.enabled }
          : schedule
      )
    );
  };

  const editSchedule = (id, updatedSchedule) => {
    // Delete the old schedule
    const filteredSchedules = schedules.filter(
      (schedule) => schedule.id !== id
    );

    // Create new schedules for each selected day
    const newSchedules = updatedSchedule.days.map((day) => ({
      id: Date.now() + day, // New unique ID for each day
      name: updatedSchedule.name,
      time: updatedSchedule.time,
      day: day, // Single day instead of array
      bellSound: updatedSchedule.bellSound || "./bell.mp3",
      repetitions: updatedSchedule.repetitions || 1,
      enabled: true,
    }));

    setSchedules([...filteredSchedules, ...newSchedules]);
  };

  return (
    <div className="App">
      <BellStatus ringing={bellRinging} schedule={ringingSchedule} />

      <div className="app-container">
        <h1 className="app-title">School Bell Manager</h1>

        <CurrentTime currentTime={currentTime} />
        <DayFilter selectedDay={selectedDay} onDayChange={setSelectedDay} />
        <ScheduleList
          schedules={schedules}
          currentTime={currentTime}
          selectedDay={selectedDay}
          onDelete={deleteSchedule}
          onToggle={toggleSchedule}
          onEdit={editSchedule}
          onAdd={() => setShowAddModal(true)}
        />

        <footer className="app-footer">
          <p>Made with ❤️ by Fahri Laode Sadikin</p>
        </footer>
      </div>

      <AddScheduleModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onAdd={addSchedule}
      />
    </div>
  );
}

export default App;
