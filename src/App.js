import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Cards from './components/Cards'
import RewardPrograms from './components/RewardPrograms'
import TravelPartners from './components/TravelPartners'
import HowToSpend from './components/HowToSpend'
import TransferRatios from './components/TransferRatios'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [creditcards,setCards] = useState([])
  const [rewardprograms,setRewardPrograms] = useState([])
  const [travelpartners,setTravelPartners] = useState([])
  const [displayedInformation,setDisplayedInformation] = useState(["somestuff","line2","line3"])
  const [transferRatios,setTransferRatios] = useState([])

  const serverAddress = "ec2-3-129-25-235.us-east-2.compute.amazonaws.com"
  const serverPort = 5000

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    const getCards = async () => {
      const cardsFromServer = await fetchCreditCards()
      setCards(cardsFromServer)
    }
    const getRewardPrograms = async () => {
      const rewardProgramsFromServer = await fetchRewardPrograms()
      setRewardPrograms(rewardProgramsFromServer)
    }
    const getTravelPartners = async () => {
      const travelPartnersFromServer = await fetchTravelPartners()
      setTravelPartners(travelPartnersFromServer)
    }
    const getRewardRatios = async () => {
      const rewardRatiosFromServer = await fetchRewardRatios()
      setTransferRatios(rewardRatiosFromServer)
    }


    getTasks()
    getCards()
    getTravelPartners()
    getRewardPrograms()
    getRewardRatios()

  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`http://${serverAddress}:${serverPort}/tasks`)
    const data = await res.json()
    
    return data
  }
    // Fetch Credit Cards
  const fetchCreditCards = async () => {
    const res = await fetch(`http://${serverAddress}:${serverPort}/creditcards`)
    const data = await res.json()
    return sortedByName(data)
  }

  const sortedByName = (data) => {
    const dataSorted =  data.sort((x, y) => (x.name > y.name) ? 1 : -1)
    return dataSorted
  }

  const fetchRewardRatios = async (creditcardID) => {
    var query = `http://${serverAddress}:${serverPort}/transferratios`

    if (creditcardID !== null)
    {
      query = `http://${serverAddress}:${serverPort}/transferratios?from_reward_program=${creditcardID}`
    }
    const res = await fetch(query)
    const data = await res.json()
    console.log(data)

    return sortedByName(data)
  }

  // Fetch Reward Programs
  const fetchRewardPrograms = async () => {
    const res = await fetch(`http://${serverAddress}:${serverPort}/rewardprograms`)
    const data = await res.json()
    return sortedByName(data)
  }

    // Fetch Reward Programs
    const fetchTravelPartners = async () => {
      const res = await fetch(`http://${serverAddress}:${serverPort}/travelpartners`)
      const data = await res.json()
      return sortedByName(data)
        }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://${serverAddress}:${serverPort}/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`http://${serverAddress}:${serverPort}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  const rewardOnSelect = async (selection) => {setTransferRatios(await fetchRewardRatios(selection.value))}
  const travelPartnerOnSelect = (selection) => {console.log(selection)}

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {/* {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )} */}
              <RewardPrograms rewardprograms={rewardprograms} cardOnSelect={rewardOnSelect} ></RewardPrograms>
              <TravelPartners travelpartners={travelpartners} cardOnSelect={travelPartnerOnSelect} ></TravelPartners>
              <HowToSpend displayedInformation={displayedInformation}>   </HowToSpend>
              <TransferRatios transferRatios={transferRatios} > </TransferRatios>
              {/* <Cards cards={creditcards} cardOnSelect={cardOnSelect} ></Cards> */}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
