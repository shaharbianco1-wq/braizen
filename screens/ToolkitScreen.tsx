import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../theme';

type Tool = {
  icon: string;
  title: string;
  desc: string;
  color: string;
  glow: string;
  tag?: string;
};

const TOOLS: Tool[] = [
  { icon: '🎙️', title: 'Voice Practice',    desc: 'Build vocal presence and confidence', color: C.purple,  glow: C.purpleGlow, tag: 'Social' },
  { icon: '🏋️', title: 'Workout System',    desc: 'Log sets, reps, and track volume',    color: C.blue,    glow: C.blueGlow },
  { icon: '🥗', title: 'Nutrition Scanner', desc: 'Snap a meal for instant macros',      color: C.green,   glow: C.greenGlow },
  { icon: '🧘', title: 'Breathing',         desc: 'Guided breathwork to calm your mind', color: '#38BDF8', glow: 'rgba(56,189,248,0.2)' },
  { icon: '📸', title: 'Physique Scan',     desc: 'Analyze body composition over time',  color: C.gold,    glow: C.goldGlow, tag: 'AI' },
  { icon: '👔', title: 'Outfit Rating',     desc: 'AI feedback on style and fit',         color: '#F472B6', glow: 'rgba(244,114,182,0.2)', tag: 'AI' },
  { icon: '🧍', title: 'Posture Analysis',  desc: 'Correct alignment with side-profile', color: '#34D399', glow: 'rgba(52,211,153,0.2)', tag: 'AI' },
  { icon: '📓', title: 'Journal',           desc: 'Daily reflection and gratitude',       color: '#A78BFA', glow: 'rgba(167,139,250,0.2)' },
  { icon: '🎯', title: 'Goal Tracker',      desc: 'Set, track, and crush your goals',    color: C.red,     glow: 'rgba(239,68,68,0.2)' },
  { icon: '📊', title: 'Progress Charts',   desc: 'Visual stats for every life area',    color: C.blue,    glow: C.blueGlow },
];

const CHALLENGES = [
  { icon: '💪', title: '30 Push-ups',      xp: 50,  tag: 'Fitness' },
  { icon: '🧊', title: 'Cold Shower',      xp: 75,  tag: 'Discipline' },
  { icon: '📵', title: '1hr No Phone',     xp: 100, tag: 'Focus' },
  { icon: '🗣️', title: 'Talk to Stranger', xp: 150, tag: 'Social' },
];

export default function ToolkitScreen() {
  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>Toolkit</Text>
        <Text style={s.sub}>Everything you need to improve</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Daily Challenges */}
        <Text style={s.sectionTitle}>Daily Challenges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.challengeRow} contentContainerStyle={{ paddingRight: 20, gap: 12 }}>
          {CHALLENGES.map(ch => (
            <TouchableOpacity key={ch.title} activeOpacity={0.8}>
              <LinearGradient
                colors={['#1A0A3E', C.card]}
                style={s.challengeCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={s.challengeIcon}>{ch.icon}</Text>
                <Text style={s.challengeTitle}>{ch.title}</Text>
                <View style={s.xpPill}>
                  <Text style={s.xpText}>+{ch.xp} XP</Text>
                </View>
                <Text style={s.challengeTag}>{ch.tag}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tools Grid */}
        <Text style={s.sectionTitle}>Complete Toolkit</Text>
        <View style={s.grid}>
          {TOOLS.map(tool => (
            <TouchableOpacity key={tool.title} style={[s.toolCard, { borderColor: tool.glow }]} activeOpacity={0.75}>
              <View style={[s.toolIconWrap, { backgroundColor: tool.glow }]}>
                <Text style={s.toolIcon}>{tool.icon}</Text>
              </View>
              {tool.tag && (
                <View style={[s.toolTag, { backgroundColor: tool.glow }]}>
                  <Text style={[s.toolTagText, { color: tool.color }]}>{tool.tag}</Text>
                </View>
              )}
              <Text style={s.toolTitle}>{tool.title}</Text>
              <Text style={s.toolDesc}>{tool.desc}</Text>
              <View style={[s.toolBar, { backgroundColor: tool.color }]} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },
  title:  { fontSize: 28, fontWeight: '900', color: C.white },
  sub:    { fontSize: 13, color: C.textSub, marginTop: 2 },

  scroll: { paddingHorizontal: 20, paddingBottom: 20 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: C.white, marginBottom: 14 },

  challengeRow: { marginBottom: 28, marginLeft: -20 },
  challengeCard:{ width: 140, borderRadius: R.lg, padding: 16, marginLeft: 20, borderWidth: 1, borderColor: C.cardBorder },
  challengeIcon:{ fontSize: 28, marginBottom: 10 },
  challengeTitle:{ fontSize: 13, fontWeight: '700', color: C.white, marginBottom: 8 },
  xpPill:       { backgroundColor: C.purpleGlow, borderRadius: R.full, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 6 },
  xpText:       { color: C.purpleLight, fontSize: 11, fontWeight: '700' },
  challengeTag: { fontSize: 11, color: C.textSub },

  grid:       { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  toolCard:   { width: '47%', backgroundColor: C.card, borderRadius: R.lg, padding: 16, borderWidth: 1, overflow: 'hidden', position: 'relative' },
  toolIconWrap:{ width: 44, height: 44, borderRadius: R.md, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  toolIcon:   { fontSize: 22 },
  toolTag:    { position: 'absolute', top: 12, right: 12, borderRadius: R.full, paddingHorizontal: 8, paddingVertical: 3 },
  toolTagText:{ fontSize: 10, fontWeight: '700' },
  toolTitle:  { fontSize: 14, fontWeight: '700', color: C.white, marginBottom: 4 },
  toolDesc:   { fontSize: 11, color: C.textSub, lineHeight: 15 },
  toolBar:    { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, opacity: 0.6 },
});
