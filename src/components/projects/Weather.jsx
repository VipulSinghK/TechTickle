import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose'];

const weatherAppGuides = {
  'React Native': {
    steps: [
      {
        title: 'Set Up Your React Native Project',
        description: 'Initialize a React Native project using Expo CLI for cross-platform development. Install dependencies for API requests, location services, and UI components. Ensure you have an API key from OpenWeatherMap.',
        code: `npm install -g expo-cli
expo init my-weather-app --template blank
cd my-weather-app
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context axios expo-location
npx expo start`,
        tips: [
          'Sign up for OpenWeatherMap API key and store it securely.',
          'Use Expo for easy location permissions handling.',
          'Test location services on physical devices.',
          'Add error handling for API failures and permissions denials.'
        ]
      },
      {
        title: 'Create Weather Display and Location Components',
        description: 'Build components to fetch location, retrieve weather data via API, and display it. Use hooks for state management and AsyncStorage for caching data.',
        code: `// src/components/WeatherDisplay.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = 'your-api-key';

const WeatherDisplay = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission denied');
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      fetchWeather(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(\`https://api.openweathermap.org/data/2.5/weather?lat=\${lat}&lon=\${lon}&appid=\${API_KEY}&units=metric\`);
      setWeather(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather');
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{weather.main.temp}°C</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  city: { fontSize: 32 },
  temp: { fontSize: 48, fontWeight: 'bold' },
  description: { fontSize: 24 }
});

export default WeatherDisplay;`,
        tips: [
          'Cache weather data in AsyncStorage for offline access.',
          'Add refresh functionality with pull-to-refresh.',
          'Handle different weather icons using image assets.',
          'Implement search for other cities using text input.'
        ]
      },
      {
        title: 'Style with React Native Stylesheet',
        description: 'Apply styles for a responsive UI that adapts to different devices. Use conditional styling based on weather conditions.',
        code: `// In WeatherDisplay.jsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: weather?.weather[0].main === 'Rain' ? '#A9A9A9' : '#87CEEB'
  }
});`,
        tips: [
          'Use dynamic backgrounds based on weather type.',
          'Support dark mode with useColorScheme.',
          'Test on various screen sizes using Expo.',
          'Add animations for weather transitions.'
        ]
      },
      {
        title: 'Deploy to App Stores',
        description: 'Build and publish the app using Expo EAS for iOS and Android.',
        code: `npx expo install eas-cli
eas build --platform all
eas submit --platform ios
eas submit --platform android`,
        tips: [
          'Include privacy policy for location usage.',
          'Use OTA updates for API key changes.',
          'Test on beta channels.',
          'Comply with store guidelines on data usage.'
        ]
      }
    ]
  },
  Flutter: {
    steps: [
      {
        title: 'Set Up Your Flutter Project',
        description: 'Create a Flutter project and add dependencies for HTTP requests and location services. Obtain an OpenWeatherMap API key.',
        code: `flutter create my_weather_app
cd my_weather_app
flutter pub add provider http geolocator
flutter run`,
        tips: [
          'Run flutter doctor to ensure setup.',
          'Handle permissions in AndroidManifest and Info.plist.',
          'Test on emulators for location simulation.',
          'Add error boundaries for API calls.'
        ]
      },
      {
        title: 'Create Weather Display and Location Screens',
        description: 'Build screens to get location, fetch weather, and display data. Use Provider for state management.',
        code: `// lib/main.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/weather_provider.dart';
import 'screens/weather_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => WeatherProvider(),
      child: MaterialApp(
        title: 'Weather App',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: WeatherScreen(),
      ),
    );
  }
}

// lib/providers/weather_provider.dart
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:geolocator/geolocator.dart';

class WeatherProvider with ChangeNotifier {
  Map<String, dynamic>? _weather;
  String? _error;

  Map<String, dynamic>? get weather => _weather;
  String? get error => _error;

  Future<void> fetchWeather() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) {
        _error = 'Location services disabled';
        notifyListeners();
        return;
      }
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          _error = 'Permission denied';
          notifyListeners();
          return;
        }
      }
      Position position = await Geolocator.getCurrentPosition();
      final response = await http.get(Uri.parse('https://api.openweathermap.org/data/2.5/weather?lat=\${position.latitude}&lon=\${position.longitude}&appid=your-api-key&units=metric'));
      if (response.statusCode == 200) {
        _weather = json.decode(response.body);
        _error = null;
      } else {
        _error = 'Failed to load weather';
      }
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
}

// lib/screens/weather_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/weather_provider.dart';

class WeatherScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final weatherProvider = Provider.of<WeatherProvider>(context);
    if (weatherProvider.weather == null && weatherProvider.error == null) {
      weatherProvider.fetchWeather();
    }

    return Scaffold(
      appBar: AppBar(title: Text('Weather')),
      body: Center(
        child: weatherProvider.error != null
            ? Text(weatherProvider.error!)
            : weatherProvider.weather != null
                ? Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(weatherProvider.weather!['name'], style: TextStyle(fontSize: 32)),
                      Text('\${weatherProvider.weather!['main']['temp']}°C', style: TextStyle(fontSize: 48)),
                      Text(weatherProvider.weather!['weather'][0]['description'], style: TextStyle(fontSize: 24)),
                    ],
                  )
                : CircularProgressIndicator(),
      ),
    );
  }
}`,
        tips: [
          'Use shared_preferences for caching.',
          'Add city search with TextField.',
          'Handle different weather icons.',
          'Test on physical devices.'
        ]
      },
      {
        title: 'Style with Flutter Themes',
        description: 'Use themes for consistent styling and dynamic colors based on weather.',
        code: `// In main.dart
theme: ThemeData(
  primarySwatch: Colors.blue,
  brightness: Brightness.light,
),

// In WeatherScreen
Container(
  color: weather?['weather'][0]['main'] == 'Rain' ? Colors.grey : Colors.blue,
  child: Text(...),
);`,
        tips: [
          'Adapt to system dark mode.',
          'Use MediaQuery for responsiveness.',
          'Test on different devices.',
          'Add animations for data loading.'
        ]
      },
      {
        title: 'Deploy to App Stores',
        description: 'Build and submit to stores using Flutter CLI.',
        code: `flutter build apk --release
flutter build ios --release`,
        tips: [
          'Use Codemagic for CI/CD.',
          'Add icons with flutter_launcher_icons.',
          'Beta test with TestFlight.',
          'Include privacy for location.'
        ]
      }
    ]
  },
  SwiftUI: {
    steps: [
      {
        title: 'Set Up Your SwiftUI Project',
        description: 'Create a SwiftUI project in Xcode. Add dependencies for location and networking.',
        code: `// App.swift
import SwiftUI

@main
struct WeatherApp: App {
    var body: some Scene {
        WindowGroup {
            WeatherView()
        }
    }
}`,
        tips: [
          'Use previews for iteration.',
          'Add Info.plist keys for location.',
          'Test on simulator.',
          'Enforce code style with SwiftLint.'
        ]
      },
      {
        title: 'Create Weather View',
        description: 'Build view to fetch location and weather data.',
        code: `// WeatherView.swift
import SwiftUI
import CoreLocation

struct WeatherView: View {
    @StateObject private var viewModel = WeatherViewModel()

    var body: some View {
        VStack {
            if let error = viewModel.error {
                Text(error)
            } else if let weather = viewModel.weather {
                Text(weather.name)
                    .font(.largeTitle)
                Text("\(weather.main.temp)°C")
                    .font(.system(size: 48, weight: .bold))
                Text(weather.weather[0].description)
                    .font(.title2)
            } else {
                ProgressView()
            }
        }
        .onAppear {
            viewModel.fetchWeather()
        }
    }
}

// WeatherViewModel.swift
import Foundation
import CoreLocation
import Combine

class WeatherViewModel: ObservableObject {
    @Published var weather: WeatherResponse?
    @Published var error: String?
    private var locationManager = CLLocationManager()
    private var cancellables = Set<AnyCancellable>()

    func fetchWeather() {
        locationManager.requestWhenInUseAuthorization()
        locationManager.publisher(for: \.authorizationStatus)
            .sink { status in
                if status == .authorizedWhenInUse {
                    self.locationManager.requestLocation()
                } else {
                    self.error = "Permission denied"
                }
            }
            .store(in: &cancellables)
        
        locationManager.publisher(for: \.location)
            .compactMap { $0 }
            .flatMap { location in
                URLSession.shared.dataTaskPublisher(for: URL(string: "https://api.openweathermap.org/data/2.5/weather?lat=\(location.coordinate.latitude)&lon=\(location.coordinate.longitude)&appid=your-api-key&units=metric")!)
                    .map { $0.data }
                    .decode(type: WeatherResponse.self, decoder: JSONDecoder())
            }
            .receive(on: DispatchQueue.main)
            .sink(receiveCompletion: { _ in }, receiveValue: { self.weather = $0 })
            .store(in: &cancellables)
    }
}

struct WeatherResponse: Codable {
    let name: String
    let main: Main
    let weather: [Weather]
}

struct Main: Codable {
    let temp: Double
}

struct Weather: Codable {
    let description: String
}`,
        tips: [
          'Use UserDefaults for caching.',
          'Add search functionality.',
          'Handle icons with SF Symbols.',
          'Test VoiceOver accessibility.'
        ]
      },
      {
        title: 'Style with SwiftUI Modifiers',
        description: 'Use modifiers for styling and responsiveness.',
        code: `VStack {
    Text(...)
}
.background(weather?.weather[0].main == "Rain" ? Color.gray : Color.blue)
.cornerRadius(8)`,
        tips: [
          'Adapt to dark mode.',
          'Use GeometryReader for layouts.',
          'Test in previews.',
          'Use system icons.'
        ]
      },
      {
        title: 'Deploy to App Store',
        description: 'Archive and submit via Xcode.',
        code: `// Xcode: Product > Archive > Distribute`,
        tips: [
          'Use TestFlight.',
          'Add assets.',
          'Follow HIG.',
          'Handle privacy.'
        ]
      }
    ]
  },
  'Jetpack Compose': {
    steps: [
      {
        title: 'Set Up Your Jetpack Compose Project',
        description: 'Create project in Android Studio with Compose. Add dependencies for networking and location.',
        code: `// build.gradle.kts
dependencies {
    implementation("androidx.compose.ui:ui:1.5.0")
    implementation("androidx.compose.material3:material3:1.1.0")
    implementation("com.google.android.gms:play-services-location:21.0.1")
    implementation("io.coil-kt:coil-compose:2.2.2")
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
    implementation("com.squareup.retrofit2:converter-gson:2.9.0")
}`,
        tips: [
          'Add permissions in manifest.',
          'Use emulator for location.',
          'Add coroutines.'
        ]
      },
      {
        title: 'Create Weather Composable',
        description: 'Build composable to fetch and display weather.',
        code: `// WeatherScreen.kt
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.google.accompanist.permissions.*
import android.Manifest
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET
import retrofit2.http.Query

interface WeatherApi {
    @GET("weather")
    suspend fun getWeather(@Query("lat") lat: Double, @Query("lon") lon: Double, @Query("appid") appid: String, @Query("units") units: String = "metric"): WeatherResponse
}

val retrofit = Retrofit.Builder().baseUrl("https://api.openweathermap.org/data/2.5/").addConverterFactory(GsonConverterFactory.create()).build()
val api = retrofit.create(WeatherApi::class.java)

data class WeatherResponse(val name: String, val main: Main, val weather: List<Weather>)
data class Main(val temp: Double)
data class Weather(val description: String)

@OptIn(ExperimentalPermissionsApi::class)
@Composable
fun WeatherScreen() {
    val locationPermissionsState = rememberMultiplePermissionsState(listOf(Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION))
    var weather by remember { mutableStateOf<WeatherResponse?>(null) }
    var error by remember { mutableStateOf<String?>(null) }

    LaunchedEffect(locationPermissionsState.allPermissionsGranted) {
        if (locationPermissionsState.allPermissionsGranted) {
            // Get location and fetch
            // Simplified: assume location fetched
            try {
                weather = api.getWeather(37.7749, -122.4194, "your-api-key")
            } catch (e: Exception) {
                error = e.message
            }
        }
    }

    if (!locationPermissionsState.allPermissionsGranted) {
        Button(onClick = { locationPermissionsState.launchMultiplePermissionRequest() }) {
            Text("Request Location")
        }
    } else if (error != null) {
        Text(error!!)
    } else if (weather != null) {
        Column(Modifier.fillMaxSize().wrapContentSize()) {
            Text(weather!!.name)
            Text("$°C")
            Text(weather!!.weather[0].description)
        }
    } else {
        CircularProgressIndicator()
    }
}`,
        tips: [
          'Use DataStore for caching.',
          'Add search.',
          'Handle icons.',
          'Test TalkBack.'
        ]
      },
      {
        title: 'Style with Material 3 Themes',
        description: 'Use themes for styling.',
        code: `MaterialTheme {
    Surface(color = if (weather?.weather?.get(0)?.main == "Rain") Color.Gray else Color.Blue) {
        Text(...)
    }
}`,
        tips: [
          'Adapt dark mode.',
          'Responsive with constraints.',
          'Test versions.',
          'Material icons.'
        ]
      },
      {
        title: 'Deploy to Google Play',
        description: 'Build and upload AAB.',
        code: `./gradlew bundleRelease`,
        tips: [
          'App signing.',
          'Icons.',
          'Internal testing.',
          'Policies.'
        ]
      }
    ]
  }
};

const Weather = () => {
  const [selectedFramework, setSelectedFramework] = useState('React Native');

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build a Weather App with ${selectedFramework}`, 10, 10);
    weatherAppGuides[selectedFramework].steps.forEach((step, index) => {
      const yPos = 20 + index * 70;
      doc.setFontSize(14);
      doc.text(`Step ${index + 1}: ${step.title}`, 10, yPos);
      doc.setFontSize(12);
      doc.text(step.description, 10, yPos + 10, { maxWidth: 180 });
      doc.text('Code:', 10, yPos + 25);
      doc.text(step.code, 10, yPos + 35, { maxWidth: 180 });
      doc.text('Tips:', 10, yPos + 50);
      step.tips.forEach((tip, i) => {
        doc.text(`- ${tip}`, 10, yPos + 60 + i * 5, { maxWidth: 180 });
      });
    });
    doc.save(`weather-app-guide-${selectedFramework.toLowerCase().replace(/ /g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">

        {/* === Weather App Section === */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build a Weather App with {selectedFramework}
          </h2>
          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          {frameworks.map((framework) => (
            <button
              key={framework}
              className={`px-4 py-2 rounded ${
                selectedFramework === framework
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-400 text-white hover:bg-blue-500'
              }`}
              onClick={() => setSelectedFramework(framework)}
            >
              {framework}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Table of Contents</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            {weatherAppGuides[selectedFramework].steps.map((step, index) => (
              <li key={index}>
                <a
                  href={`#step-${index + 1}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Step {index + 1}: {step.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          {weatherAppGuides[selectedFramework].steps.map((step, index) => (
            <div
              key={index}
              id={`step-${index + 1}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Step {index + 1}: {step.title}
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{step.description}</p>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {step.code}
              </SyntaxHighlighter>
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Tips</h4>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  {step.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-gray-700 dark:text-gray-300">
          <p>Progress: Completed {weatherAppGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>

      </div>
    </div>
  );
};

export default Weather;