import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../theme';

const LEVELS = [
  { level: 1,  name: 'Rookie',     badge: '🥉', color: '#CD7F32' },
  { level: 2,  name: 'Apprentice', badge: '🥈', color: '#9CA3AF' },
  { level: 3,  name: 'Warrior',    badge: '⚔️',  color: '#A78BFA' },
  { level: 4,  name: 'Champion',   badge: '🛡️',  color: '#60A5FA' },
  { level: 5,  name: 'Elite',      badge: '💠',  color: '#38BDF8' },
  { level: 6,  name: 'Legend',     badge: '🌟',  color: C.gold },
  { level: 7,  name: 'Master',     badge: '⚡',  color: '#F472B6' },
  { level: 8,  name: 'Grandmaster',badge: '🔷',  color: '#06B6D4' },
  { level: 9,  name: 'Titan',      badge: '🌀',  color: '#8B5CF6' },
  { level: 10, name: 'APEX',       badge: '👑',  color: C.gold },
];

const CURRENT_LEVEL = 3;
const CURRENT_XP    = 1240;
const NEXT_LEVEL_XP = 2000;
const XP_PCT        = Math.round((CURRENT_XP / NEXT_LEVEL_XP) * 100);

const STATS = [
  { label: 'Days Active', value: '24',  icon: '📅' },
  { label: 'Tasks Done',  value: '186', icon: '✅' },
  { label: 'Best Streak', value: '12',  icon: '🔥' },
  { label: 'XP Total',    value: '3.2k',icon: '⚡' },
];

export default function ProgressScreen() {
  const { width } = useWindowDimensions();
  const BAR_WIDTH = width - 40 - 56; // screen - horizontal padding - card padding
  const xpFillWidth = Math.round((XP_PCT / 100) * BAR_WIDTH);
  const current = LEVELS[CURRENT_LEVEL - 1];
  const next    = LEVELS[Math.min(CURRENT_LEVEL, LEVELS.length - 1)];

  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <View style={s.header}>
        <Text style={s.title}>Progression</Text>
        <Text style={s.sub}>Level up your real life</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Current Level Card */}
        <LinearGradient
          colors={['#1A0A3E', '#0D0820', C.bg]}
          style={s.levelCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={s.currentBadge}>{current.badge}</Text>
          <Text style={[s.currentLevel, { color: current.color }]}>Level {CURRENT_LEVEL}</Text>
          <Text style={s.currentName}>{current.name}</Text>

          {/* XP Bar */}
          <View style={s.xpBarWrap}>
            <View style={s.xpBarBg}>
              <LinearGradient
                colors={[C.purple, C.purpleLight]}
                style={[s.xpBarFill, { width: xpFillWidth }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={s.xpLabel}>{CURRENT_XP.toLocaleString()} / {NEXT_LEVEL_XP.toLocaleString()} XP</Text>
          </View>

          <Text style={s.nextLevel}>Next: {next.name} {next.badge}</Text>
        </LinearGradient>

        {/* Stats Row */}
        <View style={s.statsRow}>
          {STATS.map(stat => (
            <View key={stat.label} style={s.statCard}>
              <Text style={s.statIcon}>{stat.icon}</Text>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Level Grid */}
        <Text style={s.sectionTitle}>All Ranks</Text>
        <View style={s.levelGrid}>
          {LEVELS.map(lvl => {
            const unlocked = lvl.level <= CURRENT_LEVEL;
            const isCurrent = lvl.level === CURRENT_LEVEL;
            return (
              <View
                key={lvl.level}
                style={[
                  s.levelCell,
                  isCurrent && { borderColor: lvl.color, borderWidth: 2 },
                  !unlocked && s.levelCellLocked,
                ]}
              >
                {isCurrent && (
                  <LinearGradient
                    colors={[`${lvl.color}30`, 'transparent']}
                    style={StyleSheet.absoluteFill}
                  />
                )}
                <Text style={[s.levelBadge, !unlocked && { opacity: 0.25 }]}>{lvl.badge}</Text>
                <Text style={[s.levelNum, !unlocked && { color: C.textMuted }]}>Level {lvl.level}</Text>
                <Text style={[s.levelName, !unlocked && { color: C.textMuted }]}>{lvl.name}</Text>
                {isCurrent && <View style={[s.currentDot, { backgroundColor: lvl.color }]} />}
              </View>
            );
          })}
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

  levelCard:   { borderRadius: R.xl, padding: 28, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: C.cardBorder },
  currentBadge:{ fontSize: 56, marginBottom: 10 },
  currentLevel:{ fontSize: 15, fontWeight: '700', letterSpacing: 2, marginBottom: 4 },
  currentName: { fontSize: 32, fontWeight: '900', color: C.white, marginBottom: 24 },
  xpBarWrap:   { width: '100%', marginBottom: 8 },
  xpBarBg:     { height: 8, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: R.full, overflow: 'hidden', marginBottom: 8 },
  xpBarFill:   { height: 8, borderRadius: R.full },
  xpLabel:     { color: C.textSub, fontSize: 12, textAlign: 'center' },
  nextLevel:   { color: C.purpleLight, fontSize: 13, fontWeight: '600', marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  statCard: { flex: 1, backgroundColor: C.card, borderRadius: R.md, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: C.cardBorder },
  statIcon: { fontSize: 20, marginBottom: 6 },
  statValue:{ fontSize: 18, fontWeight: '800', color: C.white, marginBottom: 2 },
  statLabel:{ fontSize: 10, color: C.textSub, textAlign: 'center' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: C.white, marginBottom: 14 },
  levelGrid:    { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  levelCell:    { width: '18%', aspectRatio: 0.85, backgroundColor: C.card, borderRadius: R.md, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.cardBorder, overflow: 'hidden', position: 'relative' },
  levelCellLocked: { backgroundColor: '#0A0A14' },
  levelBadge:   { fontSize: 22, marginBottom: 4 },
  levelNum:     { fontSize: 9, color: C.textSub, fontWeight: '600' },
  levelName:    { fontSize: 8, color: C.purpleLight, fontWeight: '600', textAlign: 'center', marginTop: 1 },
  currentDot:   { width: 6, height: 6, borderRadius: 3, marginTop: 4 },
});
