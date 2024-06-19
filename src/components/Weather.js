import React from "react";
import { useState } from "react";
import axios from "axios";
import { Input, Button, Form, Typography, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  FaSun,
  FaCloudSun,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaSmog,
  FaBolt,
  FaQuestionCircle,
} from "react-icons/fa";

const { Title, Paragraph } = Typography;

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "1d85be298e7b0b4eaf750cd415138ee4";

  const getWeather = async (e) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please enter again");
      setWeather(null);
    }
  };

  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return <FaSun size={50} />;
      case "Clouds":
        return <FaCloudSun size={50} />;
      case "Drizzle":
      case "Rain":
        return <FaCloudShowersHeavy size={50} />;
      case "Snow":
        return <FaSnowflake size={50} />;
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
        return <FaSmog size={50} />;
      case "Thunderstorm":
        return <FaBolt size={50} />;
      default:
        return <FaQuestionCircle size={50} />;
    }
  };

  return (
    <div className="app-container" style={{ padding: "2rem" }}>
      <div className="blur-overlay"></div>
      <div className="content">
        <Title>Weather App</Title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Form
            layout="inline"
            onFinish={getWeather}
            style={{ marginBottom: "1rem" }}
          >
            <Form.Item>
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter the city name"
                style={{ width: 300 }}
              />
            </Form.Item>
            <Form.Item className="responsive-button">
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Check Weather
              </Button>
            </Form.Item>
          </Form>
          {error && <Paragraph type="danger">{error}</Paragraph>}
          {weather && (
            <Card title={weather.name} style={{ marginTop: "1rem" }}>
              <Paragraph>Temperature: {weather.main.temp}°C</Paragraph>
              <Paragraph>Weather: {weather.weather[0].description}</Paragraph>
              <div style={{ marginTop: "1rem" }}>
                {getWeatherIcon(weather.weather[0].main)}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
