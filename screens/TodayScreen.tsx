import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../theme';

type Task = { id: string; title: string; subtitle: string; icon: string; done: boolean };
type Block = { label: string; time: string; color: string; tasks: Task[] };

const INITIAL_BLOCKS: Block[] = [
  {
    label: 'Morning', time: '8:00 AM', color: C.gold,
    tasks: [
      { id: 'm1', title: 'Morning Reflection', subtitle: '15 min · Mindset', icon: '✨', done: false },
      { id: 'm2', title: 'Cold Shower', subtitle: '5 min · Discipline', icon: '🚿', done: false },
      { id: 'm3', title: 'Workout Session', subtitle: '30 min · Fitness', icon: '🏋️', done: false },
    ],
  },
  {
    label: 'Afternoon', time: '2:00 PM', color: C.blue,
    tasks: [
      { id: 'a1', title: 'Voice Practice', subtitle: '15 min · Social Skills', icon: '🎙️', done: false },
      { id: 'a2', title: 'Nutrition Check', subtitle: '5 min · Health', icon: '🥗', done: false },
    ],
  },
  {
    label: 'Evening', time: '8:00 PM', color: C.purple,
    tasks: [
      { id: 'e1', title: 'Evening Review', subtitle: '10 min · Reflection', icon: '📓', done: false },
      { id: 'e2', title: 'Sleep by 11PM', subtitle: 'Recovery', icon: '😴', done: false },
    ],
  },
];

const TODAY = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

function RingProgress({ percent }: { percent: number }) {
  const filled  = percent > 0;
  const done    = percent === 100;
  const color   = done ? C.green : filled ? C.purple : 'rgba(255,255,255,0.1)';
  return (
    <View style={[ring.circle, {
      borderColor: color,
      shadowColor: filled ? color : 'transparent',
    }]}>
      <Text style={ring.pct}>{percent}%</Text>
      <Text style={ring.pctLabel}>done</Text>
    </View>
  );
}

export default function TodayScreen() {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);

  const toggle = useCallback((blockIdx: number, taskId: string) => {
    setBlocks(prev => prev.map((b, i) =>
      i !== blockIdx ? b : {
        ...b,
        tasks: b.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t),
      }
    ));
  }, []);

  const allTasks  = blocks.flatMap(b => b.tasks);
  const doneCount = allTasks.filter(t => t.done).length;
  const total     = allTasks.length;
  const percent   = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  return (
    <SafeAreaView style={s.root} edges={['top']}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.appName}>BRIZEN</Text>
          <Text style={s.date}>{TODAY}</Text>
        </View>
        <View style={s.streakBadge}>
          <Text style={s.streakFire}>🔥</Text>
          <Text style={s.streakNum}>7</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Focus Card */}
        <LinearGradient
          colors={['#1A0A3E', '#0F0F1C']}
          style={s.focusCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={s.focusLeft}>
            <Text style={s.focusLabel}>TODAY'S FOCUS</Text>
            <Text style={s.focusTitle}>Social{'\n'}Confidence</Text>
            <View style={s.xpRow}>
              <Text style={s.xpIcon}>⚡</Text>
              <Text style={s.xpText}>{doneCount * 25} XP earned</Text>
            </View>
          </View>
          <RingProgress percent={percent} />
        </LinearGradient>

        {/* Task Blocks */}
        {blocks.map((block, blockIdx) => (
          <View key={block.label} style={s.block}>
            <View style={s.blockHeader}>
              <View style={[s.blockDot, { backgroundColor: block.color }]} />
              <Text style={s.blockLabel}>{block.label}</Text>
              <Text style={s.blockTime}>{block.time}</Text>
            </View>

            {block.tasks.map(task => (
              <TouchableOpacity
                key={task.id}
                style={[s.taskCard, task.done && s.taskCardDone]}
                onPress={() => toggle(blockIdx, task.id)}
                activeOpacity={0.7}
              >
                <View style={[s.taskIcon, { backgroundColor: task.done ? C.purpleGlow : C.card }]}>
                  <Text style={s.taskEmoji}>{task.icon}</Text>
                </View>
                <View style={s.taskText}>
                  <Text style={[s.taskTitle, task.done && s.taskTitleDone]}>{task.title}</Text>
                  <Text style={s.taskSub}>{task.subtitle}</Text>
                </View>
                <View style={[s.check, task.done && s.checkDone]}>
                  {task.done && <Text style={s.checkMark}>✓</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const RING = 110;
const ring = StyleSheet.create({
  circle:   { width: RING, height: RING, borderRadius: RING / 2, borderWidth: 10, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 14, elevation: 6 },
  pct:      { color: C.white, fontSize: 22, fontWeight: '800' },
  pctLabel: { color: C.textSub, fontSize: 10, marginTop: 1 },
});

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  appName:{ fontSize: 20, fontWeight: '900', color: C.white, letterSpacing: 4 },
  date:   { fontSize: 12, color: C.textSub, marginTop: 2 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderWidth: 1, borderColor: C.cardBorder, borderRadius: R.full, paddingHorizontal: 12, paddingVertical: 6, gap: 4 },
  streakFire:  { fontSize: 14 },
  streakNum:   { color: C.gold, fontWeight: '700', fontSize: 14 },

  scroll: { paddingHorizontal: 20, paddingBottom: 20 },

  focusCard:  { borderRadius: R.xl, padding: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, borderWidth: 1, borderColor: C.cardBorder },
  focusLeft:  { flex: 1 },
  focusLabel: { fontSize: 11, fontWeight: '700', color: C.purpleLight, letterSpacing: 2, marginBottom: 6 },
  focusTitle: { fontSize: 26, fontWeight: '900', color: C.white, lineHeight: 30, marginBottom: 14 },
  xpRow:      { flexDirection: 'row', alignItems: 'center', gap: 6 },
  xpIcon:     { fontSize: 14 },
  xpText:     { color: C.gold, fontSize: 13, fontWeight: '600' },

  block:       { marginBottom: 24 },
  blockHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  blockDot:    { width: 8, height: 8, borderRadius: 4 },
  blockLabel:  { fontSize: 15, fontWeight: '700', color: C.text, flex: 1 },
  blockTime:   { fontSize: 12, color: C.textSub },

  taskCard:     { backgroundColor: C.card, borderRadius: R.md, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: C.cardBorder },
  taskCardDone: { borderColor: C.purpleGlow, backgroundColor: '#110D1E' },
  taskIcon:     { width: 44, height: 44, borderRadius: R.md, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  taskEmoji:    { fontSize: 20 },
  taskText:     { flex: 1 },
  taskTitle:    { fontSize: 15, fontWeight: '600', color: C.text, marginBottom: 3 },
  taskTitleDone:{ textDecorationLine: 'line-through', color: C.textMuted },
  taskSub:      { fontSize: 12, color: C.textSub },
  check:        { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: C.textMuted, alignItems: 'center', justifyContent: 'center' },
  checkDone:    { backgroundColor: C.purple, borderColor: C.purple },
  checkMark:    { color: C.white, fontSize: 13, fontWeight: '700' },
});
