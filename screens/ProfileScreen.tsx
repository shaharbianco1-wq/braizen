import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { C, R } from '../theme';

const STATS = [
  { label: 'Level',   value: '3',   icon: '⚔️',  color: C.purpleLight },
  { label: 'Streak',  value: '7',   icon: '🔥',  color: C.gold },
  { label: 'Days',    value: '24',  icon: '📅',  color: C.blue },
  { label: 'XP',      value: '1.2k',icon: '⚡',  color: C.green },
];

const AREAS = [
  { label: 'Fitness',      pct: 72, color: C.blue   },
  { label: 'Social Skills',pct: 55, color: C.purple  },
  { label: 'Mindset',      pct: 83, color: C.green   },
  { label: 'Discipline',   pct: 60, color: C.gold    },
];

const SETTINGS = [
  { icon: '🎯', label: 'Focus Area',        right: 'Social Confidence' },
  { icon: '🔔', label: 'Notifications',     right: 'On' },
  { icon: '🌙', label: 'Dark Mode',         right: 'Always' },
  { icon: '📊', label: 'Weekly Report',     right: 'Sunday' },
  { icon: '🔒', label: 'App Blocker',       right: 'Off' },
  { icon: '❓', label: 'Help & Support',    right: '' },
];

export default function ProfileScreen() {
  const { width } = useWindowDimensions();
  // card: 20px margin each side + 20px padding each side + 90px label + 34px pct + 12px gap×2
  const BAR_WIDTH = width - 40 - 40 - 90 - 34 - 24;

  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={['#1A0A3E', '#0D0820', C.bg]}
          style={s.hero}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={s.avatar}>
            <Text style={s.avatarText}>S</Text>
          </View>
          <Text style={s.name}>Shahar</Text>
          <View style={s.rankRow}>
            <Text style={s.rankBadge}>⚔️</Text>
            <Text style={s.rankLabel}>Warrior · Level 3</Text>
          </View>
          <Text style={s.memberSince}>Member since June 2026</Text>
        </LinearGradient>

        {/* Stats */}
        <View style={s.statsRow}>
          {STATS.map(stat => (
            <View key={stat.label} style={s.statCard}>
              <Text style={s.statIcon}>{stat.icon}</Text>
              <Text style={[s.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Progress Areas */}
        <Text style={s.sectionTitle}>Life Areas</Text>
        <View style={s.areasCard}>
          {AREAS.map(area => (
            <View key={area.label} style={s.areaRow}>
              <Text style={s.areaLabel}>{area.label}</Text>
              <View style={s.areaBarBg}>
                <LinearGradient
                  colors={[area.color, `${area.color}88`]}
                  style={[s.areaBarFill, { width: Math.round((area.pct / 100) * BAR_WIDTH) }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={[s.areaPct, { color: area.color }]}>{area.pct}%</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <Text style={s.sectionTitle}>Settings</Text>
        <View style={s.settingsCard}>
          {SETTINGS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[s.settingRow, i < SETTINGS.length - 1 && s.settingBorder]}
              activeOpacity={0.6}
            >
              <Text style={s.settingIcon}>{item.icon}</Text>
              <Text style={s.settingLabel}>{item.label}</Text>
              <View style={s.settingRight}>
                {item.right ? <Text style={s.settingValue}>{item.right}</Text> : null}
                <Text style={s.settingChevron}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root:   { flex: 1, backgroundColor: C.bg },
  scroll: { paddingBottom: 20 },

  hero:       { paddingTop: 32, paddingBottom: 32, alignItems: 'center', borderBottomWidth: 1, borderColor: C.cardBorder, marginBottom: 20 },
  avatar:     { width: 80, height: 80, borderRadius: 40, backgroundColor: C.purple, alignItems: 'center', justifyContent: 'center', marginBottom: 14, shadowColor: C.purple, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 10 },
  avatarText: { fontSize: 32, fontWeight: '900', color: C.white },
  name:       { fontSize: 26, fontWeight: '900', color: C.white, marginBottom: 6 },
  rankRow:    { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  rankBadge:  { fontSize: 16 },
  rankLabel:  { fontSize: 14, color: C.purpleLight, fontWeight: '600' },
  memberSince:{ fontSize: 12, color: C.textMuted },

  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 28 },
  statCard: { flex: 1, backgroundColor: C.card, borderRadius: R.md, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: C.cardBorder },
  statIcon: { fontSize: 18, marginBottom: 6 },
  statValue:{ fontSize: 17, fontWeight: '800', marginBottom: 2 },
  statLabel:{ fontSize: 10, color: C.textSub },

  sectionTitle: { fontSize: 15, fontWeight: '700', color: C.white, marginBottom: 12, paddingHorizontal: 20 },

  areasCard:   { backgroundColor: C.card, borderRadius: R.lg, padding: 20, marginHorizontal: 20, marginBottom: 28, borderWidth: 1, borderColor: C.cardBorder, gap: 16 },
  areaRow:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
  areaLabel:   { width: 90, fontSize: 12, color: C.textSub },
  areaBarBg:   { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: R.full, overflow: 'hidden' },
  areaBarFill: { height: 6, borderRadius: R.full },
  areaPct:     { width: 34, fontSize: 12, fontWeight: '700', textAlign: 'right' },

  settingsCard:  { backgroundColor: C.card, borderRadius: R.lg, marginHorizontal: 20, borderWidth: 1, borderColor: C.cardBorder, overflow: 'hidden' },
  settingRow:    { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15 },
  settingBorder: { borderBottomWidth: 1, borderColor: C.cardBorder },
  settingIcon:   { fontSize: 18, marginRight: 14 },
  settingLabel:  { flex: 1, fontSize: 14, color: C.text, fontWeight: '500' },
  settingRight:  { flexDirection: 'row', alignItems: 'center', gap: 8 },
  settingValue:  { fontSize: 13, color: C.textSub },
  settingChevron:{ fontSize: 20, color: C.textMuted },
});
