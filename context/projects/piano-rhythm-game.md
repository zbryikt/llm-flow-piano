# Piano Rhythm Game - 落下音符鋼琴遊戲

## 專案概述

一個網頁版的節奏遊戲，音符以長條形式從上方落下，玩家需要在適當時機按下對應的鋼琴琴鍵。

## 技術堆疊

- **模板引擎**: Pug
- **樣式**: Stylus
- **腳本**: LiveScript (遵循 lsc-coding-guide.md 規範)
- **開發環境**: @zbryikt/template
- **音訊**: Web Audio API

## 核心功能

### 1. 音符系統
- 13 個半音階琴鍵（完整八度 + 一音）
- 音符範圍: C4 ~ C5 (包含黑鍵 C#, D#, F#, G#, A#)
- 音符以長條 (bar) 形式從畫面上方落下
- 長條長度對應音符持續時間

### 2. 聲音引擎

#### 主要方案：Web Audio API 合成音
```livescript
sound-engine = (type = 'synth') ->
  @ <<<
    type: type
    audio-ctx: new AudioContext!
  @

sound-engine.prototype = Object.create(Object.prototype) <<<
  play-synth: (frequency, duration) ->
    # 使用 OscillatorNode 生成音頻

  note-to-freq: (note) ->
    # 音符名稱轉頻率 (A4 = 440Hz 為基準)

  play: (note, duration) ->
    # 統一播放介面
```

#### 預留擴充：音檔播放
- 未來可替換為真實鋼琴採樣音檔
- 透過統一的 `play(note, duration)` 介面切換

### 3. 輸入系統

#### 鍵盤映射（完整半音階）
```
黑鍵： W    E         T    Y    U
      C#   D#        F#   G#   A#
      ║    ║         ║    ║    ║
     ╔╩╗  ╔╩╗       ╔╩╗  ╔╩╗  ╔╩╗
白鍵：║A║  ║S║  ║D║  ║F║  ║G║  ║H║  ║J║  ║K║
      C4   D4   E4   F4   G4   A4   B4   C5
```

**映射表：**
- 白鍵: `A S D F G H J K` → `C4 D4 E4 F4 G4 A4 B4 C5`
- 黑鍵: `W E T Y U` → `C#4 D#4 F#4 G#4 A#4`

#### 滑鼠/觸控
- 點擊畫面下方的視覺化琴鍵
- 支援 `mousedown` / `touchstart` 事件
- 支援多點觸控（和弦）

### 4. 樂譜格式

使用 JSON 格式定義樂譜：

```json
{
  "title": "樂曲名稱",
  "bpm": 120,
  "notes": [
    {
      "time": 0,
      "key": "C4",
      "duration": 500
    },
    {
      "time": 500,
      "key": "E4",
      "duration": 500
    }
  ]
}
```

**欄位說明：**
- `time`: 音符開始時間（毫秒，從樂曲開始計算）
- `key`: 音符名稱（如 `C4`, `D#4`）
- `duration`: 音符持續時間（毫秒），決定長條視覺長度

### 5. 遊戲機制

#### 音符掉落
- 音符從畫面頂部開始出現
- 依據固定速度往下移動
- 到達底部判定線時，玩家需按下對應琴鍵

#### 判定系統
- **Perfect**: 誤差 ±50ms
- **Good**: 誤差 ±100ms
- **Miss**: 超過 ±100ms 或未按

#### 計分系統（初版可選實作）
- Perfect: 100 分
- Good: 50 分
- Miss: 0 分
- Combo 加成

## 檔案結構

```
web/
├── src/
│   └── pug/
│       └── index.pug          # 主頁面
├── static/
│   └── assets/
│       └── data/
│           └── songs/         # 樂譜 JSON 檔案
│               └── demo.json
```

## 核心元件設計

### 1. SoundEngine (sound-engine.ls)
- 負責音訊生成
- 提供音符播放介面
- 音符名稱轉頻率計算

### 2. Piano (piano.ls)
- 視覺化鋼琴琴鍵
- 處理鍵盤/滑鼠/觸控輸入
- 觸發音符播放

### 3. NoteManager (note-manager.ls)
- 管理音符掉落邏輯
- 載入樂譜資料
- 同步音符時間軸

### 4. Game (game.ls)
- 主遊戲控制器
- 整合各元件
- 判定系統
- 計分系統

## 開發階段

### Phase 1: 基礎架構
- [ ] 建立專案結構（@zbryikt/template）
- [ ] 實作 SoundEngine（Web Audio API）
- [ ] 實作 Piano 視覺元件
- [ ] 鍵盤/滑鼠輸入綁定

### Phase 2: 音符系統
- [ ] 實作 NoteManager
- [ ] 音符掉落動畫
- [ ] 樂譜載入與解析
- [ ] 建立範例樂譜（如小星星）

### Phase 3: 遊戲邏輯
- [ ] 判定系統
- [ ] 計分系統
- [ ] 遊戲開始/結束流程

### Phase 4: 優化與擴充
- [ ] 音效優化（ADSR envelope）
- [ ] 視覺特效（按鍵回饋、粒子效果）
- [ ] 難度調整（速度、判定寬容度）
- [ ] 更多樂譜

## 音符頻率對照表

基準：A4 = 440 Hz，使用十二平均律

| 音符 | 頻率 (Hz) |
|------|-----------|
| C4   | 261.63    |
| C#4  | 277.18    |
| D4   | 293.66    |
| D#4  | 311.13    |
| E4   | 329.63    |
| F4   | 349.23    |
| F#4  | 369.99    |
| G4   | 392.00    |
| G#4  | 415.30    |
| A4   | 440.00    |
| A#4  | 466.16    |
| B4   | 493.88    |
| C5   | 523.25    |

## 參考資料

- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- 十二平均律計算: f(n) = 440 × 2^((n-49)/12)
- LiveScript 編碼規範: context/shared/lsc-coding-guide.md
- 開發環境設置: context/shared/fedev.md
