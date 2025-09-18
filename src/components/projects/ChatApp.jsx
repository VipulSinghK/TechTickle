import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose'];

const chatAppGuides = {
  'React Native': {
    steps: [
      {
        title: 'Set Up Your React Native Project',
        description: 'Initialize a React Native project using Expo CLI for cross-platform development. Install dependencies for navigation, Firebase for real-time database, and authentication. Create a Firebase project and configure it for your app.',
        code: `npm install -g expo-cli
expo init my-chat-app --template blank
cd my-chat-app
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
npx expo start`,
        tips: [
          'Set up a Firebase project at console.firebase.google.com and add iOS/Android apps.',
          'Download google-services.json for Android and GoogleService-Info.plist for iOS.',
          'Use Expo for easy setup; eject if native modules are needed.',
          'Handle Firebase initialization in App.js.'
        ]
      },
      {
        title: 'Create Chat List and Message Input Components',
        description: 'Build components for displaying chat messages and sending new ones. Use Firestore for real-time updates and FlatList for efficient rendering.',
        code: `// src/components/ChatScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from '@react-native-firebase/firestore';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: message,
        createdAt: new Date(),
        userId: user.uid,
        userName: user.displayName || user.email,
      });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text style={styles.user}>{item.userName}:</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  message: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  user: { fontWeight: 'bold' },
  inputContainer: { flexDirection: 'row', padding: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, marginRight: 10 }
});

export default ChatScreen;`,
        tips: [
          'Implement user authentication with Firebase Auth.',
          'Add real-time listeners for new messages.',
          'Handle offline persistence with Firestore settings.',
          'Optimize FlatList with inverted for chat UI.'
        ]
      },
      {
        title: 'Integrate Authentication',
        description: 'Add login/signup screens using Firebase Authentication for user management.',
        code: `// src/components/LoginScreen.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigation.navigate('Chat'))
      .catch(error => console.error(error));
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigation.navigate('Chat'))
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 }
});

export default LoginScreen;`,
        tips: [
          'Add error handling and loading states.',
          'Use React Navigation for auth flow.',
          'Implement logout functionality.',
          'Consider email verification.'
        ]
      },
      {
        title: 'Style with React Native Stylesheet',
        description: 'Use StyleSheet for performant styling. Make chat bubbles responsive and themeable.',
        code: `// In ChatScreen.jsx
const styles = StyleSheet.create({
  message: {
    alignSelf: item.userId === user.uid ? 'flex-end' : 'flex-start',
    backgroundColor: item.userId === user.uid ? '#DCF8C6' : '#FFF',
    borderRadius: 10,
    padding: 10,
    margin: 5
  }
});`,
        tips: [
          'Differentiate sent/received messages with colors.',
          'Support dark mode with useColorScheme.',
          'Add timestamps to messages.',
          'Use Dimensions for responsive layouts.'
        ]
      },
      {
        title: 'Deploy to App Stores',
        description: 'Build and publish using Expo EAS, ensuring Firebase configurations are included.',
        code: `npx expo install eas-cli
eas build --platform all
eas submit --platform ios
eas submit --platform android`,
        tips: [
          'Handle push notifications with Expo Notifications.',
          'Test real-time features on physical devices.',
          'Comply with data privacy for user messages.',
          'Use OTA for quick updates.'
        ]
      }
    ]
  },
  Flutter: {
    steps: [
      {
        title: 'Set Up Your Flutter Project',
        description: 'Create a Flutter project and add dependencies for Firebase, authentication, and real-time database.',
        code: `flutter create my_chat_app
cd my_chat_app
flutter pub add firebase_core firebase_auth cloud_firestore provider
flutter run`,
        tips: [
          'Initialize Firebase in main.dart.',
          'Add Firebase configs to android/ios folders.',
          'Run flutterfire configure for setup.',
          'Test on emulators for Firebase.'
        ]
      },
      {
        title: 'Create Chat List and Message Input Screens',
        description: 'Build screens for chat display and input. Use StreamBuilder for real-time Firestore updates.',
        code: `// lib/screens/chat_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../providers/auth_provider.dart';

class ChatScreen extends StatefulWidget {
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _controller = TextEditingController();
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;

  void _sendMessage() async {
    if (_controller.text.trim().isNotEmpty) {
      await _firestore.collection('messages').add({
        'text': _controller.text,
        'createdAt': Timestamp.now(),
        'userId': _auth.currentUser?.uid,
        'userName': _auth.currentUser?.displayName ?? _auth.currentUser?.email,
      });
      _controller.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Chat'), actions: [IconButton(icon: Icon(Icons.logout), onPressed: () => Provider.of<AuthProvider>(context, listen: false).logout())]),
      body: Column(
        children: [
          Expanded(
            child: StreamBuilder<QuerySnapshot>(
              stream: _firestore.collection('messages').orderBy('createdAt', descending: true).snapshots(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) return Center(child: CircularProgressIndicator());
                final messages = snapshot.data!.docs;
                return ListView.builder(
                  reverse: true,
                  itemCount: messages.length,
                  itemBuilder: (context, index) {
                    final msg = messages[index].data() as Map<String, dynamic>;
                    return ListTile(
                      title: Text(msg['text']),
                      subtitle: Text(msg['userName']),
                      tileColor: msg['userId'] == _auth.currentUser?.uid ? Colors.green[100] : null,
                    );
                  },
                );
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8),
            child: Row(
              children: [
                Expanded(child: TextField(controller: _controller, decoration: InputDecoration(labelText: 'Message'))),
                IconButton(icon: Icon(Icons.send), onPressed: _sendMessage),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// lib/providers/auth_provider.dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';

class AuthProvider with ChangeNotifier {
  final _auth = FirebaseAuth.instance;

  User? get user => _auth.currentUser;

  Future<void> signUp(String email, String password) async {
    await _auth.createUserWithEmailAndPassword(email: email, password: password);
    notifyListeners();
  }

  Future<void> signIn(String email, String password) async {
    await _auth.signInWithEmailAndPassword(email: email, password: password);
    notifyListeners();
  }

  Future<void> logout() async {
    await _auth.signOut();
    notifyListeners();
  }
}`,
        tips: [
          'Use Provider for auth state management.',
          'Add scrolling to bottom on new messages.',
          'Handle authentication routing.',
          'Implement user presence.'
        ]
      },
      {
        title: 'Integrate Authentication',
        description: 'Add login/signup screens with Firebase Auth.',
        code: `// lib/screens/login_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  void _signUp() {
    Provider.of<AuthProvider>(context, listen: false).signUp(_emailController.text, _passwordController.text);
  }

  void _signIn() {
    Provider.of<AuthProvider>(context, listen: false).signIn(_emailController.text, _passwordController.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: _emailController, decoration: InputDecoration(labelText: 'Email')),
            TextField(controller: _passwordController, decoration: InputDecoration(labelText: 'Password'), obscureText: true),
            ElevatedButton(onPressed: _signUp, child: Text('Sign Up')),
            ElevatedButton(onPressed: _signIn, child: Text('Sign In')),
          ],
        ),
      ),
    );
  }
}`,
        tips: [
          'Add validation for inputs.',
          'Handle errors with snackbars.',
          'Navigate to chat on success.',
          'Add forgot password feature.'
        ]
      },
      {
        title: 'Style with Flutter Themes',
        description: 'Use Material themes for consistent styling. Customize chat bubbles.',
        code: `// In main.dart
MaterialApp(
  theme: ThemeData(primarySwatch: Colors.green),
);

// In ChatScreen
Align(
  alignment: msg['userId'] == _auth.currentUser?.uid ? Alignment.centerRight : Alignment.centerLeft,
  child: Container(
    padding: EdgeInsets.all(10),
    decoration: BoxDecoration(
      color: msg['userId'] == _auth.currentUser?.uid ? Colors.green[200] : Colors.grey[200],
      borderRadius: BorderRadius.circular(10),
    ),
    child: Text(msg['text']),
  ),
)`,
        tips: [
          'Support dark mode.',
          'Use responsive sizing.',
          'Add avatars for users.',
          'Animate message appearance.'
        ]
      },
      {
        title: 'Deploy to App Stores',
        description: 'Build and submit using Flutter CLI.',
        code: `flutter build apk --release
flutter build ios --release`,
        tips: [
          'Integrate Firebase Cloud Messaging for notifications.',
          'Test on multiple devices.',
          'Handle app permissions.',
          'Follow privacy guidelines.'
        ]
      }
    ]
  },
  SwiftUI: {
    steps: [
      {
        title: 'Set Up Your SwiftUI Project',
        description: 'Create a SwiftUI project in Xcode. Add Firebase SDK via Swift Package Manager.',
        code: `// In Xcode: File > Add Package Dependency > https://github.com/firebase/firebase-ios-sdk
// App.swift
import SwiftUI
import FirebaseCore

@main
struct ChatApp: App {
    init() {
        FirebaseApp.configure()
    }
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}`,
        tips: [
          'Add GoogleService-Info.plist to project.',
          'Enable Firestore and Auth in Firebase console.',
          'Test on simulator.',
          'Use previews.'
        ]
      },
      {
        title: 'Create Chat View',
        description: 'Build view for chat with real-time Firestore listener.',
        code: `// ChatView.swift
import SwiftUI
import FirebaseAuth
import FirebaseFirestore

struct ChatView: View {
    @State private var message = ""
    @State private var messages: [Message] = []
    let db = Firestore.firestore()
    let auth = Auth.auth()

    var body: some View {
        VStack {
            List(messages) { msg in
                HStack {
                    if msg.userId == auth.currentUser?.uid {
                        Spacer()
                    }
                    VStack(alignment: .leading) {
                        Text(msg.userName)
                            .font(.subheadline)
                        Text(msg.text)
                    }
                    .padding()
                    .background(msg.userId == auth.currentUser?.uid ? Color.green : Color.gray)
                    .cornerRadius(10)
                    if msg.userId != auth.currentUser?.uid {
                        Spacer()
                    }
                }
            }
            HStack {
                TextField("Message", text: $message)
                Button("Send") {
                    sendMessage()
                }
            }.padding()
        }
        .onAppear {
            listenForMessages()
        }
    }

    func listenForMessages() {
        db.collection("messages").order(by: "createdAt").addSnapshotListener { snapshot, error in
            guard let documents = snapshot?.documents else { return }
            messages = documents.compactMap { doc -> Message? in
                try? doc.data(as: Message.self)
            }
        }
    }

    func sendMessage() {
        guard let user = auth.currentUser else { return }
        let newMessage = Message(text: message, createdAt: Date(), userId: user.uid, userName: user.displayName ?? user.email ?? "")
        try? db.collection("messages").addDocument(from: newMessage)
        message = ""
    }
}

struct Message: Identifiable, Codable {
    @DocumentID var id: String?
    let text: String
    let createdAt: Date
    let userId: String
    let userName: String
}`,
        tips: [
          'Use Codable for Firestore mapping.',
          'Add scrolling to latest message.',
          'Handle auth state changes.',
          'Implement logout.'
        ]
      },
      {
        title: 'Integrate Authentication',
        description: 'Add login view with Firebase Auth.',
        code: `// LoginView.swift
import SwiftUI
import FirebaseAuth

struct LoginView: View {
    @State private var email = ""
    @State private var password = ""
    @State private var isLoggedIn = false

    var body: some View {
        if isLoggedIn {
            ChatView()
        } else {
            VStack {
                TextField("Email", text: $email)
                SecureField("Password", text: $password)
                Button("Sign Up") { signUp() }
                Button("Sign In") { signIn() }
            }.padding()
        }
    }

    func signUp() {
        Auth.auth().createUser(withEmail: email, password: password) { _, error in
            if error == nil { isLoggedIn = true }
        }
    }

    func signIn() {
        Auth.auth().signIn(withEmail: email, password: password) { _, error in
            if error == nil { isLoggedIn = true }
        }
    }
}`,
        tips: [
          'Add error alerts.',
          'Use @ObservedObject for auth.',
          'Handle password reset.',
          'Secure fields for passwords.'
        ]
      },
      {
        title: 'Style with SwiftUI Modifiers',
        description: 'Use modifiers for chat UI styling.',
        code: `VStack {
    Text(...)
}
.padding()
.background(Color.green.opacity(0.2))
.cornerRadius(10)`,
        tips: [
          'Adapt to dark mode.',
          'Use GeometryReader.',
          'Add timestamps.',
          'Animate list updates.'
        ]
      },
      {
        title: 'Deploy to App Store',
        description: 'Archive and submit via Xcode.',
        code: `// Xcode: Product > Archive > Distribute`,
        tips: [
          'Integrate push notifications.',
          'Test on devices.',
          'Add privacy manifest.',
          'Follow HIG.'
        ]
      }
    ]
  },
  'Jetpack Compose': {
    steps: [
      {
        title: 'Set Up Your Jetpack Compose Project',
        description: 'Create project in Android Studio. Add Firebase dependencies.',
        code: `// build.gradle.kts
dependencies {
    implementation("androidx.compose.ui:ui:1.5.0")
    implementation("androidx.compose.material3:material3:1.1.0")
    implementation("com.google.firebase:firebase-auth")
    implementation("com.google.firebase:firebase-firestore")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2")
}`,
        tips: [
          'Add google-services.json.',
          'Enable multidex if needed.',
          'Initialize Firebase in Application class.',
          'Test on emulator.'
        ]
      },
      {
        title: 'Create Chat Composable',
        description: 'Build composable for chat with Firestore real-time.',
        code: `// ChatScreen.kt
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

data class Message(val id: String, val text: String, val userId: String, val userName: String)

@Composable
fun ChatScreen() {
    val auth = FirebaseAuth.getInstance()
    val db = FirebaseFirestore.getInstance()
    var message by remember { mutableStateOf("") }
    var messages by remember { mutableStateOf(listOf<Message>()) }
    val coroutineScope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        db.collection("messages")
            .orderBy("createdAt", Query.Direction.DESCENDING)
            .addSnapshotListener { snapshot, _ ->
                snapshot?.let {
                    messages = it.documents.map { doc ->
                        Message(doc.id, doc.getString("text") ?: "", doc.getString("userId") ?: "", doc.getString("userName") ?: "")
                    }
                }
            }
    }

    Column {
        LazyColumn(reverseLayout = true) {
            items(messages) { msg ->
                Card(
                    modifier = Modifier.align(if (msg.userId == auth.currentUser?.uid) Alignment.End else Alignment.Start),
                    colors = CardDefaults.cardColors(containerColor = if (msg.userId == auth.currentUser?.uid) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surfaceVariant)
                ) {
                    Text(msg.userName)
                    Text(msg.text)
                }
            }
        }
        Row {
            OutlinedTextField(value = message, onValueChange = { message = it }, label = { Text("Message") })
            Button(onClick = {
                val newMsg = hashMapOf("text" to message, "createdAt" to com.google.firebase.Timestamp.now(), "userId" to auth.currentUser?.uid, "userName" to (auth.currentUser?.displayName ?: auth.currentUser?.email))
                coroutineScope.launch {
                    db.collection("messages").add(newMsg)
                }
                message = ""
            }) {
                Text("Send")
            }
        }
    }
}`,
        tips: [
          'Use ViewModel for state.',
          'Handle auth changes.',
          'Add scrolling.',
          'Implement offline support.'
        ]
      },
      {
        title: 'Integrate Authentication',
        description: 'Add login composable with Firebase Auth.',
        code: `// LoginScreen.kt
import androidx.compose.material3.*
import androidx.compose.runtime.*
import com.google.firebase.auth.FirebaseAuth

@Composable
fun LoginScreen(onLogin: () -> Unit) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    val auth = FirebaseAuth.getInstance()

    Column {
        OutlinedTextField(value = email, onValueChange = { email = it }, label = { Text("Email") })
        OutlinedTextField(value = password, onValueChange = { password = it }, label = { Text("Password") })
        Button(onClick = {
            auth.createUserWithEmailAndPassword(email, password).addOnSuccessListener { onLogin() }
        }) { Text("Sign Up") }
        Button(onClick = {
            auth.signInWithEmailAndPassword(email, password).addOnSuccessListener { onLogin() }
        }) { Text("Sign In") }
    }
}`,
        tips: [
          'Handle errors.',
          'Navigate on success.',
          'Add loading indicators.',
          'Secure password input.'
        ]
      },
      {
        title: 'Style with Material 3 Themes',
        description: 'Use Material 3 for styling.',
        code: `MaterialTheme {
    Card(colors = CardDefaults.cardColors(...)) {
        Text(...)
    }
}`,
        tips: [
          'Dynamic colors.',
          'Responsive constraints.',
          'Test themes.',
          'Add icons.'
        ]
      },
      {
        title: 'Deploy to Google Play',
        description: 'Build and upload AAB.',
        code: `./gradlew bundleRelease`,
        tips: [
          'App signing.',
          'Add icons.',
          'Internal testing.',
          'Privacy policies.'
        ]
      }
    ]
  }
};

const ChatApp = () => {
  const [selectedFramework, setSelectedFramework] = useState('React Native');

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build a Chat App with ${selectedFramework}`, 10, 10);
    chatAppGuides[selectedFramework].steps.forEach((step, index) => {
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
    doc.save(`chat-app-guide-${selectedFramework.toLowerCase().replace(/ /g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">

        {/* === Chat App Section === */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build a Chat App with {selectedFramework}
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
            {chatAppGuides[selectedFramework].steps.map((step, index) => (
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
          {chatAppGuides[selectedFramework].steps.map((step, index) => (
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
          <p>Progress: Completed {chatAppGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>

      </div>
    </div>
  );
};

export default ChatApp;