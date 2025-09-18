import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const frameworks = ['React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose'];

const noteTakingGuides = {
  'React Native': {
    steps: [
      {
        title: 'Set Up Your React Native Project',
        description: 'Initialize a React Native project using Expo CLI for easier development and testing on iOS and Android. React Native allows cross-platform mobile development with JavaScript. Ensure Node.js (version 18 or higher), Expo CLI, and the Expo Go app on your mobile device are installed.',
        code: `npm install -g expo-cli
expo init my-note-app --template blank
cd my-note-app
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
npx expo start`,
        tips: [
          'Use Expo for rapid prototyping; switch to bare workflow for native modules.',
          'Install ESLint for code quality: `npm install --save-dev eslint`.',
          'Test on physical devices using Expo Go app for realistic performance.',
          'Add TypeScript for type safety: `expo install typescript @types/react @types/react-native`.'
        ]
      },
      {
        title: 'Create Note List and Editor Components',
        description: 'Build `NoteList` and `NoteEditor` components using React Native elements. Use `useState` and `AsyncStorage` for local state management and persistence. Implement navigation with React Navigation for switching between list and editor screens. Add accessibility features like VoiceOver support.',
        code: `// src/components/NoteList.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      setNotes(savedNotes ? JSON.parse(savedNotes) : []);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const deleteNote = async (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Editor')}
        accessibilityLabel="Add new note"
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.noteItem}
            onPress={() => navigation.navigate('Editor', { note: item })}
            
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <TouchableOpacity
              onPress={() => deleteNote(item.id)}
              accessibilityLabel="Delete note"
            >
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addButton: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#007AFF', borderRadius: 25, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: 'white', fontSize: 24 },
  noteItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' },
  noteTitle: { fontSize: 18 },
  deleteButton: { color: 'red' }
});

export default NoteList;

// src/components/NoteEditor.jsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const NoteEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const note = route.params?.note;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const saveNote = async () => {
    const notes = await AsyncStorage.getItem('notes');
    const parsedNotes = notes ? JSON.parse(notes) : [];
    const noteId = note?.id || Date.now();
    const updatedNotes = parsedNotes.filter(n => n.id !== noteId);
    updatedNotes.push({ id: noteId, title, content });
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        accessibilityLabel="Note title"
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        accessibilityLabel="Note content"
      />
      <TouchableOpacity style={styles.saveButton} onPress={saveNote} accessibilityLabel="Save note">
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titleInput: { borderWidth: 1, borderColor: '#E5E5E5', padding: 8, marginBottom: 8, fontSize: 18 },
  contentInput: { flex: 1, borderWidth: 1, borderColor: '#E5E5E5', padding: 8, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, marginTop: 16 },
  saveButtonText: { color: 'white', textAlign: 'center', fontSize: 16 }
});

export default NoteEditor;`,
        tips: [
          'Use Redux or MobX for complex state management in larger apps.',
          "Persist notes in AsyncStorage for offline access: `AsyncStorage.setItem('notes', JSON.stringify(notes))`.",
          'Add gesture support with `react-native-gesture-handler` for swipe-to-delete.',
          'Test on both iOS and Android using Expo for cross-platform compatibility.'
        ]
      },
      {
        title: 'Style with React Native Stylesheet',
        description: 'Use React Native\'s StyleSheet for performant, platform-specific styling. Implement responsive designs with `Dimensions` API and add themes for light/dark mode. Ensure styles adapt to different screen sizes.',
        code: `// In App.js or components
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width > 600 ? 32 : 16, // Responsive padding
    backgroundColor: '#F5F5F5'
  }
});`,
        tips: [
          'Use `Platform.OS` to apply iOS/Android-specific styles.',
          'Implement dark mode with `useColorScheme()` from `react-native`.',
          'Test styles on various devices using Expo\'s device simulator.',
          'Use `react-native-responsive-screen` for percentage-based dimensions.'
        ]
      },
      {
        title: 'Deploy to App Stores',
        description: 'Publish your React Native app using Expo for easy over-the-air updates or build standalone APKs/IPAs. Use Expo Application Services (EAS) for building and submitting to Google Play and App Store.',
        code: `npx expo install eas-cli
eas build --platform all
eas submit --platform ios
eas submit --platform android`,
        tips: [
          'Use Expo\'s OTA updates for quick fixes without resubmission.',
          'Add app icons and splash screens with `expo install expo-splash-screen`.',
          'Test beta versions with Expo\'s internal distribution.',
          'Follow App Store guidelines for privacy and permissions.'
        ]
      }
    ]
  },
  Flutter: {
    steps: [
      {
        title: 'Set Up Your Flutter Project',
        description: 'Create a Flutter project using Flutter CLI for cross-platform mobile development. Flutter uses Dart and provides a rich widget library for building UIs. Ensure Flutter SDK (version 3.0 or higher) and Dart are installed, and set up an emulator or physical device.',
        code: `flutter create my_note_app
cd my_note_app
flutter pub add provider shared_preferences
flutter run`,
        tips: [
          'Use VS Code or Android Studio with Flutter extensions for better development.',
          'Run `flutter doctor` to verify setup and fix issues.',
          'Test on both iOS and Android emulators for cross-platform compatibility.',
          'Add linter rules with `flutter pub add --dev lint`.'
        ]
      },
      {
        title: 'Create Note List and Editor Screens',
        description: 'Build `NoteListScreen` and `NoteEditorScreen` using Flutter widgets. Use `Provider` for state management and `shared_preferences` for local persistence. Implement navigation with `MaterialPageRoute` and add accessibility with semantics.',
        code: `// lib/screens/note_list_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/notes_provider.dart';
import 'note_editor_screen.dart';

class NoteListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Notes')),
      body: Consumer<NotesProvider>(
        builder: (context, notesProvider, child) => ListView.builder(
          itemCount: notesProvider.notes.length,
          itemBuilder: (context, index) {
            final note = notesProvider.notes[index];
            return ListTile(
              title: Text(note.title, semanticsLabel: note.title),
              subtitle: Text(note.content),
              trailing: IconButton(
                icon: Icon(Icons.delete),
                onPressed: () => notesProvider.deleteNote(note.id),
                semanticsLabel: 'Delete note',
              ),
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => NoteEditorScreen(note: note),
                ),
              ),
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => NoteEditorScreen()),
        ),
        child: Icon(Icons.add),
        tooltip: 'Add note',
      ),
    );
  }
}

// lib/screens/note_editor_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/notes_provider.dart';

class NoteEditorScreen extends StatefulWidget {
  final Note? note;
  NoteEditorScreen({this.note});

  @override
  _NoteEditorScreenState createState() => _NoteEditorScreenState();
}

class _NoteEditorScreenState extends State<NoteEditorScreen> {
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.note != null) {
      _titleController.text = widget.note!.title;
      _contentController.text = widget.note!.content;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.note == null ? 'New Note' : 'Edit Note'),
        actions: [
          IconButton(
            icon: Icon(Icons.save),
            onPressed: _saveNote,
            tooltip: 'Save note',
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _titleController,
              decoration: InputDecoration(labelText: 'Title', border: OutlineInputBorder()),
              maxLines: 1,
              semanticsLabel: 'Note title',
            ),
            SizedBox(height: 16),
            Expanded(
              child: TextField(
                controller: _contentController,
                decoration: InputDecoration(labelText: 'Content', border: OutlineInputBorder()),
                maxLines: null,
                semanticsLabel: 'Note content',
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _saveNote() {
    final title = _titleController.text;
    final content = _contentController.text;
    if (title.isNotEmpty || content.isNotEmpty) {
      Provider.of<NotesProvider>(context, listen: false).saveNote(
        id: widget.note?.id ?? DateTime.now().millisecondsSinceEpoch,
        title: title,
        content: content,
      );
      Navigator.pop(context);
    }
  }
}

// lib/providers/notes_provider.dart
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Note {
  final int id;
  final String title;
  final String content;

  Note({required this.id, required this.title, required this.content});
}

class NotesProvider with ChangeNotifier {
  List<Note> _notes = [];

  List<Note> get notes => _notes;

  NotesProvider() {
    _loadNotes();
  }

  Future<void> _loadNotes() async {
    final prefs = await SharedPreferences.getInstance();
    final notesJson = prefs.getStringList('notes') ?? [];
    _notes = notesJson.map((json) => Note.fromJson(json)).toList();
    notifyListeners();
  }

  Future<void> saveNote({required int id, required String title, required String content}) async {
    final prefs = await SharedPreferences.getInstance();
    final updatedNotes = _notes.where((note) => note.id != id).toList();
    updatedNotes.add(Note(id: id, title: title, content: content));
    _notes = updatedNotes;
    final notesJson = _notes.map((note) => note.toJson()).toList();
    prefs.setStringList('notes', notesJson);
    notifyListeners();
  }

  Future<void> deleteNote(int id) async {
    final prefs = await SharedPreferences.getInstance();
    _notes.removeWhere((note) => note.id == id);
    final notesJson = _notes.map((note) => note.toJson()).toList();
    prefs.setStringList('notes', notesJson);
    notifyListeners();
  }
}

extension on Note {
  String toJson() => '{"id": $id, "title": "$title", "content": "$content"}';
  static Note fromJson(String json) {
    // Parse JSON - simplified for example
    // In practice, use json.decode
    return Note(id: 0, title: '', content: ''); // Placeholder
  }
}`,
        tips: [
          'Use Hive or SQLite for more advanced persistence in larger apps.',
          "Persist notes in shared_preferences for simple key-value storage.",
          'Add animations with `AnimatedList` for smooth insertions/deletions.',
          'Test on physical devices for accurate gesture and performance testing.'
        ]
      },
      {
        title: 'Style with Flutter Themes',
        description: 'Use Flutter\'s Material Design themes for consistent styling across iOS and Android. Implement responsive layouts with `MediaQuery` and add custom colors for light/dark mode support.',
        code: `// lib/main.dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Note App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.light,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      darkTheme: ThemeData(
        primarySwatch: Colors.blue,
        brightness: Brightness.dark,
      ),
      themeMode: ThemeMode.system,
      home: NoteListScreen(),
    );
  }
}

// In widgets
Container(
  width: double.infinity,
  padding: EdgeInsets.all(MediaQuery.of(context).size.width * 0.04),
  child: TextField(...),
);`,
        tips: [
          'Use `Theme.of(context)` to access theme colors dynamically.',
          'Implement dark mode with `ThemeMode.system` to follow device settings.',
          'Test themes on both light and dark mode devices.',
          'Use `flutter_screenutil` for responsive sizing across devices.'
        ]
      },
      {
        title: 'Deploy to App Stores',
        description: 'Build and publish your Flutter app to Google Play and App Store using Flutter CLI. Use `flutter build` for platform-specific binaries and follow store guidelines for submission.',
        code: `flutter build apk --release  # For Android
flutter build ios --release     # For iOS
# Submit APK to Google Play Console
# Submit IPA to App Store Connect`,
        tips: [
          'Use Codemagic or Fastlane for CI/CD automation.',
          'Add app icons and launch screens with `flutter_launcher_icons`.',
          'Test beta releases with Google Play Internal Testing or TestFlight.',
          'Ensure compliance with GDPR for data storage permissions.'
        ]
      }
    ]
  },
  SwiftUI: {
    steps: [
      {
        title: 'Set Up Your SwiftUI Project',
        description: 'Create a new SwiftUI project in Xcode for iOS development. SwiftUI provides declarative UI building with live previews. Ensure Xcode (version 15 or higher) and iOS SDK are installed on macOS.',
        code: `// In Xcode: File > New > Project > iOS > App > Interface: SwiftUI > Language: Swift
// App.swift
import SwiftUI

@main
struct NoteApp: App {
    var body: some Scene {
        WindowGroup {
            NoteListView()
        }
    }
}`,
        tips: [
          'Use Xcodes SwiftUI previews for rapid iteration.',
          'Enable SwiftUI previews with `#Preview` macro.',
          'Test on iOS Simulator and physical devices.',
          'Add SwiftLint for code style enforcement.'
        ]
      },
      {
        title: 'Create Note List and Editor Views',
        description: 'Build `NoteListView` and `NoteEditorView` using SwiftUI views. Use `@State` and `@AppStorage` for local state and persistence. Implement navigation with `NavigationStack` and add accessibility with `.accessibilityLabel`.',
        code: `// Note.swift
import Foundation

struct Note: Identifiable, Codable {
    let id = UUID()
    var title: String
    var content: String
}

// NoteListView.swift
import SwiftUI

struct NoteListView: View {
    @AppStorage("notes") private var notesData: Data = Data()
    @State private var notes: [Note] = []
    @State private var showingEditor = false

    var body: some View {
        NavigationStack {
            List {
                ForEach(notes) { note in
                    NavigationLink(destination: NoteEditorView(note: note)) {
                        VStack(alignment: .leading) {
                            Text(note.title)
                                .font(.headline)
                            Text(note.content)
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                        }
                    }
                    .swipeActions {
                        Button("Delete", role: .destructive) {
                            deleteNote(note)
                        }
                    }
                }
            }
            .navigationTitle("Notes")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Add") {
                        showingEditor = true
                    }
                }
            }
            .sheet(isPresented: $showingEditor) {
                NoteEditorView()
            }
            .onAppear {
                loadNotes()
            }
        }
        .accessibilityLabel("Note list")
    }

    private func loadNotes() {
        if let decodedNotes = try? JSONDecoder().decode([Note].self, from: notesData) {
            notes = decodedNotes
        }
    }

    private func deleteNote(_ note: Note) {
        notes.removeAll { $0.id == note.id }
        saveNotes()
    }

    private func saveNotes() {
        if let encoded = try? JSONEncoder().encode(notes) {
            notesData = encoded
        }
    }
}

// NoteEditorView.swift
import SwiftUI

struct NoteEditorView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var title = ""
    @State private var content = ""
    var note: Note?

    var body: some View {
        NavigationStack {
            Form {
                TextField("Title", text: $title, axis: .vertical)
                    .accessibilityLabel("Note title")
                TextEditor(text: $content)
                    .frame(minHeight: 200)
                    .accessibilityLabel("Note content")
            }
            .navigationTitle(note == nil ? "New Note" : "Edit Note")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Save") {
                        saveNote()
                    }
                    .disabled(title.isEmpty && content.isEmpty)
                }
            }
            .onAppear {
                if let note = note {
                    title = note.title
                    content = note.content
                }
            }
        }
    }

    private func saveNote() {
        var notes: [Note] = []
        if let decoded = try? JSONDecoder().decode([Note].self, from: notesData) {
            notes = decoded
        }
        if let existingNote = note {
            notes.removeAll { $0.id == existingNote.id }
        }
        let newNote = Note(title: title, content: content)
        notes.append(newNote)
        if let encoded = try? JSONEncoder().encode(notes) {
            notesData = encoded
        }
        dismiss()
    }

    @AppStorage("notes") private var notesData: Data!
}`,
        tips: [
          'Use Core Data for advanced persistence in larger apps.',
          "Persist notes with @AppStorage for simple UserDefaults storage.",
          'Add animations with `.animation(.default)` for smooth transitions.',
          'Test accessibility with VoiceOver on iOS Simulator.'
        ]
      },
      {
        title: 'Style with SwiftUI Modifiers',
        description: 'Use SwiftUI modifiers for declarative styling and layouts. Implement responsive designs with `GeometryReader` and add themes for light/dark mode support.',
        code: `// In views
VStack {
    Text("Title")
        .font(.title)
        .foregroundColor(.primary)
}
.padding()
.background(Color(.systemBackground))
.cornerRadius(8)
.shadow(radius: 2)

// For dark mode
Color.primary // Adapts automatically

// Responsive
GeometryReader { geometry in
    Text("Content")
        .frame(width: geometry.size.width * 0.8)
}`,
        tips: [
          'Use `ColorScheme` to detect and adapt to dark mode.',
          'Implement responsive layouts with `GeometryReader` and relative sizing.',
          'Test styles in Xcode previews with different device sizes.',
          'Use SF Symbols for consistent icons: `Image(systemName: "trash")`.'
        ]
      },
      {
        title: 'Deploy to App Store',
        description: 'Build and submit your SwiftUI app to the App Store using Xcode. Archive the app, upload to App Store Connect, and follow review guidelines.',
        code: `// In Xcode: Product > Archive > Distribute App > App Store
// Or use command line
xcodebuild -scheme MyNoteApp -sdk iphoneos -configuration Release archive
xcrun altool --upload-app -f MyNoteApp.xcarchive -u your-apple-id -p your-app-password`,
        tips: [
          'Use TestFlight for beta testing before release.',
          'Add app icons and launch screens in Assets.xcassets.',
          'Follow Apple\'s Human Interface Guidelines for UI/UX.',
          'Handle privacy permissions for storage in Info.plist.'
        ]
      }
    ]
  },
  'Jetpack Compose': {
    steps: [
      {
        title: 'Set Up Your Jetpack Compose Project',
        description: 'Create a new Android project with Jetpack Compose in Android Studio for modern UI development. Jetpack Compose uses Kotlin and declarative UIs. Ensure Android Studio (Flamingo or higher) and Kotlin 1.8+ are installed.',
        code: `// In Android Studio: New Project > Empty Compose Activity
// build.gradle.kts (Module: app)
dependencies {
    implementation("androidx.compose.ui:ui:1.5.0")
    implementation("androidx.compose.material3:material3:1.1.0")
    implementation("androidx.activity:activity-compose:1.7.2")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2")
    implementation("androidx.datastore:datastore-preferences:1.0.0")
}

// MainActivity.kt
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.example.mynoteapp.ui.theme.MyNoteAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyNoteAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    NoteListScreen()
                }
            }
        }
    }
}`,
        tips: [
          'Use Android Studio\'s Compose template for quick start.',
          'Enable View Binding and Data Binding in build.gradle.',
          'Test on Android Emulator with different API levels.',
          'Add Kotlin coroutines for async operations: `implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")`.'
        ]
      },
      {
        title: 'Create Note List and Editor Composables',
        description: 'Build `NoteListScreen` and `NoteEditorScreen` using Jetpack Compose. Use `ViewModel` with `DataStore` for state management and persistence. Implement navigation with `NavHost` and add accessibility with semantics.',
        code: `// Note.kt
data class Note(
    val id: Long = System.currentTimeMillis(),
    val title: String,
    val content: String
)

// NoteViewModel.kt
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore

val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "notes")

class NoteViewModel(private val dataStore: DataStore<Preferences>) : ViewModel() {
    private val _notes = MutableStateFlow<List<Note>>(emptyList())
    val notes: StateFlow<List<Note>> = _notes.asStateFlow()

    init {
        loadNotes()
    }

    private fun loadNotes() {
        viewModelScope.launch {
            dataStore.data.collect { preferences ->
                val notesList = preferences[stringPreferencesKey("notes")]?.let { json ->
                    // Parse JSON to List<Note> - simplified
                    emptyList<Note>() // Placeholder
                } ?: emptyList()
                _notes.value = notesList
            }
        }
    }

    fun saveNote(note: Note) {
        viewModelScope.launch {
            dataStore.edit { preferences ->
                // Serialize and save - simplified
            }
        }
    }

    fun deleteNote(id: Long) {
        // Implementation
    }
}

// NoteListScreen.kt
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.contentDescription
import androidx.navigation.NavHostController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NoteListScreen(navController: NavHostController, viewModel: NoteViewModel = hiltViewModel()) {
    val notes by viewModel.notes.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Notes") })
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { navController.navigate("editor") }) {
                Icon(Icons.Default.Add, contentDescription = "Add note")
            }
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .semantics { contentDescription = "Note list" },
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(notes) { note ->
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    onClick = { navController.navigate("editor/}") }
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            text = note.title,
                            style = MaterialTheme.typography.headlineSmall
                        )
                        Text(
                            text = note.content,
                            style = MaterialTheme.typography.bodyMedium
                        )
                    }
                }
            }
        }
    }
}

// NoteEditorScreen.kt
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NoteEditorScreen(navController: NavHostController, noteId: Long? = null, viewModel: NoteViewModel = hiltViewModel()) {
    var title by remember { mutableStateOf("") }
    var content by remember { mutableStateOf("") }

    // Load note if editing

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(if (noteId == null) "New Note" else "Edit Note") },
                actions = {
                    IconButton(onClick = {
                        val note = Note(title = title, content = content)
                        viewModel.saveNote(note)
                        navController.popBackStack()
                    }) {
                        Icon(Icons.Default.Save, contentDescription = "Save note")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
                .semantics { contentDescription = "Note editor" }
        ) {
            OutlinedTextField(
                value = title,
                onValueChange = { title = it },
                label = { Text("Title") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(16.dp))
            OutlinedTextField(
                value = content,
                onValueChange = { content = it },
                label = { Text("Content") },
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                maxLines = Int.MAX_VALUE
            )
        }
    }
}`,
        tips: [
          'Use Hilt or Koin for dependency injection with ViewModels.',
          "Persist notes with DataStore for type-safe preferences.",
          'Add animations with `AnimatedVisibility` for smooth UI changes.',
          'Test accessibility with TalkBack on Android Emulator.'
        ]
      },
      {
        title: 'Style with Material 3 Themes',
        description: 'Use Material 3 themes in Jetpack Compose for consistent, adaptive styling. Implement responsive layouts with `BoxWithConstraints` and support dynamic colors for light/dark mode.',
        code: `// ui/theme/Theme.kt
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF6200EE)
)

@Composable
fun MyNoteAppTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}

// In composables
BoxWithConstraints {
    val maxWidth = maxWidth
    Text(
        text = "Title",
        style = MaterialTheme.typography.headlineMedium,
        modifier = Modifier.widthIn(max = maxWidth * 0.8f)
    )
}`,
        tips: [
          'Use `isSystemInDarkTheme()` to adapt to device theme.',
          'Implement responsive layouts with `BoxWithConstraints` and breakpoints.',
          'Test themes on different Android versions and devices.',
          'Use Material 3 icons: `Icon(painter = painterResource(R.drawable.ic_add), ...)`.'
        ]
      },
      {
        title: 'Deploy to Google Play',
        description: 'Build and publish your Jetpack Compose app to Google Play using Android Studio. Generate a signed APK/AAB and submit via Play Console.',
        code: `// In Android Studio: Build > Generate Signed Bundle / APK
// Or Gradle
./gradlew assembleRelease
./gradlew bundleRelease
// Upload AAB to Google Play Console`,
        tips: [
          'Use Play App Signing for secure key management.',
          'Add app icons and adaptive icons in res/mipmap.',
          'Test with Internal Testing tracks before production.',
          'Follow Google Play policies for permissions and privacy.'
        ]
      }
    ]
  }
};

const Notetaking = () => {
  const [selectedFramework, setSelectedFramework] = useState('React Native');
  const [loading, setLoading] = useState(false); // for product list demo
  const [error, setError] = useState(null);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`How to Build a Note Taking App with ${selectedFramework}`, 10, 10);
    noteTakingGuides[selectedFramework].steps.forEach((step, index) => {
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
    doc.save(`note-taking-guide-${selectedFramework.toLowerCase().replace(/ /g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-6">

        {/* === Note Taking Section === */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            How to Build a Note Taking App with {selectedFramework}
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
            {noteTakingGuides[selectedFramework].steps.map((step, index) => (
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
          {noteTakingGuides[selectedFramework].steps.map((step, index) => (
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
          <p>Progress: Completed {noteTakingGuides[selectedFramework].steps.length} steps for {selectedFramework}</p>
        </div>

        

      </div>
    </div>
  );
};

export default Notetaking;