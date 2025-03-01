import { useState } from "react"
import Title from "./components/Title"
import Form from "./components/Form"
import Results from "./components/Results"
import Loading from "./components/Loading"

const App = () => {
    const [city, setCity] = useState("")

    const [results, setResults] = useState({
        country: "",
        cityName: "",
        temperture: "",
        conditionText: "",
        icon: ""
    })

    const [loading, setLoading] = useState(false)

    const apiUrl = import.meta.env.VITE_APP_API_URL

    const getWeather = (e) => {
        e.preventDefault()
        setLoading(true)
        fetch(apiUrl + `&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(data => {
                setResults({
                    country: data.location.country,
                    cityName: data.location.name,
                    temperture: data.current.temp_c,
                    conditionText: data.current.condition.text,
                    icon: data.current.condition.icon
                })
                setCity("")
                setLoading(false)
            })
            .catch(() => {
                alert("エラーが発生しました。")
                setLoading(false)
            })
    }

    return (
        <div className="wrapper">
            <div className="container">
                <Title />
                <Form setCity={setCity} getWeather={getWeather} city={city} />
                {loading ? <Loading /> : <Results results={results} />
                }
            </div>
        </div>
    )
}

export default App