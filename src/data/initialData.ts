import { Task, ArtifactItem, MistakeItem, UserProfile, MentorNote, ReflectionEntry } from '../types';

export const initialProfile: UserProfile = {
  name: 'Nguyễn Văn A',
  targetRole: 'HCNS Senior tại DN FDI',
  toeicTarget: 750,
  currentToeic: 615,
  hskTarget: 'HSK 3 - 4',
  currentHskVocab: 280,
  streakDays: 6,
  totalStudyHours: 18.5,
  studyMode: 'standard'
};

export const initialTasks: Task[] = [
  // Khung Sáng (06:30 - 07:30) - Tiếng Anh TOEIC & Shadowing
  {
    id: 'task-m1',
    title: '30 Từ vựng TOEIC HR & Hợp đồng lao động',
    description: 'Ôn tập thẻ lặp lại ngắt quãng, tập trung cụm từ: severance pay, probation clause, non-disclosure.',
    slot: 'morning',
    category: 'english',
    categoryLabel: 'Tiếng Anh TOEIC & Shadowing',
    durationMinutes: 15,
    tag: 'Anki SRS (15p)',
    isTopPriority: true,
    topRank: 2,
    completed: false
  },
  {
    id: 'task-m2',
    title: 'Nghe Dictation & Shadowing Part 3 (Test 4)',
    description: 'Chép tay 2 hội thoại liên quan chủ đề phỏng vấn và đề xuất tăng lương. Đọc nhại ngữ điệu tốc độ 1.0x.',
    slot: 'morning',
    category: 'english',
    categoryLabel: 'Tiếng Anh TOEIC & Shadowing',
    durationMinutes: 30,
    tag: 'Chép chính tả (30p)',
    completed: false
  },
  {
    id: 'task-m3',
    title: 'Ghi sổ lỗi phát âm và bẫy đề thi',
    description: 'Ghi chép 3 bẫy từ đồng âm và quy tắc nối âm của giọng Anh - Úc vào Notion cá nhân.',
    slot: 'morning',
    category: 'english',
    categoryLabel: 'Tiếng Anh TOEIC & Shadowing',
    durationMinutes: 15,
    tag: 'Sổ tay (15p)',
    completed: false
  },

  // Khung Tối (19:30 - 20:30) - Tiếng Trung HSK & Phản xạ
  {
    id: 'task-e1',
    title: 'Viết tay & Nhận diện Hán tự Bài 3 (HSK 3-4)',
    description: 'Viết đúng quy tắc bút thuận 20 chữ Hán trọng điểm: 简历, 面试, 录取, 薪资, 合同.',
    slot: 'evening',
    category: 'chinese',
    categoryLabel: 'Tiếng Trung HSK & Phản xạ',
    durationMinutes: 20,
    tag: 'Tập viết (20p)',
    completed: false
  },
  {
    id: 'task-e2',
    title: 'Luyện phản xạ 5 mẫu câu HR bằng tiếng Trung',
    description: 'Tập xử lý tình huống đón tiếp ứng viên và hỏi về kinh nghiệm làm việc bằng cấu ngữ chuẩn xác.',
    slot: 'evening',
    category: 'chinese',
    categoryLabel: 'Tiếng Trung HSK & Phản xạ',
    durationMinutes: 25,
    tag: 'Khẩu ngữ (25p)',
    isTopPriority: true,
    topRank: 3,
    completed: false
  },
  {
    id: 'task-e3',
    title: 'Nộp file ghi âm phát âm 2 phút',
    description: 'Đọc to đoạn hội thoại HR số 3, kiểm tra thanh 1 và thanh 4 trước khi nộp lên kho tài liệu.',
    slot: 'evening',
    category: 'chinese',
    categoryLabel: 'Tiếng Trung HSK & Phản xạ',
    durationMinutes: 15,
    tag: 'Bài tập nộp (15p)',
    completed: false
  },

  // Khung Đêm (21:15 - 22:45) - Thực hành Nghiệp vụ HCNS & C&B
  {
    id: 'task-n1',
    title: 'Lập bảng thanh toán lương & Trích nộp BHXH tháng',
    description: 'Thực hành bóc tách phụ cấp chịu thuế / miễn thuế TNCN, tỷ lệ trích nộp 32% BHXH-BHYT-BHTN chuẩn xác theo luật mới.',
    slot: 'night',
    category: 'hcns',
    categoryLabel: 'Thực hành Nghiệp vụ HCNS & C&B',
    durationMinutes: 50,
    tag: 'Excel / Sheets (50p)',
    isTopPriority: true,
    topRank: 1,
    completed: false
  },
  {
    id: 'task-n2',
    title: 'Phân tích tình huống sa thải trái luật theo Điều 122 BLLĐ',
    description: 'Xác định 4 sai sót nghiêm trọng về quy trình lập biên bản và mời đại diện công đoàn cơ sở trong vụ tranh chấp thực tế.',
    slot: 'night',
    category: 'hcns',
    categoryLabel: 'Thực hành Nghiệp vụ HCNS & C&B',
    durationMinutes: 40,
    tag: 'Case Study (40p)',
    completed: false
  },

  // Completed items from earlier in the day
  {
    id: 'task-comp-1',
    title: 'Đọc 10 trang sách Luật Lao động 2019 (Quy định thử việc)',
    description: 'Nắm chắc Điều 24 đến 27 BLLĐ 2019 về thời gian thử việc tối đa 180 ngày với quản lý.',
    slot: 'morning',
    category: 'hcns',
    categoryLabel: 'Luật Lao động',
    durationMinutes: 20,
    completed: true,
    completedAt: '06:15'
  },
  {
    id: 'task-comp-2',
    title: 'Làm bài Mini-test Ngữ pháp TOEIC Mệnh đề quan hệ',
    description: 'Đạt 10/10 câu hỏi về đại từ quan hệ rút gọn chủ động (V-ing) và bị động (V-ed).',
    slot: 'morning',
    category: 'english',
    categoryLabel: 'Tiếng Anh TOEIC',
    durationMinutes: 15,
    completed: true,
    completedAt: '07:20'
  },
  {
    id: 'task-comp-3',
    title: 'Đồng bộ lịch phỏng vấn thử vào Google Calendar',
    description: 'Lên lịch mock interview cuối tuần với Mentor phòng nhân sự Goertek.',
    slot: 'morning',
    category: 'general',
    categoryLabel: 'Kế hoạch',
    durationMinutes: 10,
    completed: true,
    completedAt: '08:00'
  }
];

export const initialArtifacts: ArtifactItem[] = [
  {
    id: 'art-1',
    fileName: 'File_01_BangLuong_FDI_DongNai_300NV_v2.xlsx',
    description: 'Chứa công thức lương OT, phụ cấp ca 3, hạch toán BHXH • Nghiệm thu Tuần 2',
    type: 'excel',
    size: '2.4 MB',
    weekApproved: 'Tuần 2'
  },
  {
    id: 'art-2',
    fileName: 'QuyTrinh_XuLy_KyLuatLaoDong_Dieu122_BLLD2019.pdf',
    description: 'Sơ đồ 5 bước xử lý sa thải đúng pháp lý không rủi ro kiện tụng • Nghiệm thu Tuần 2',
    type: 'pdf',
    size: '850 KB',
    weekApproved: 'Tuần 2'
  },
  {
    id: 'art-3',
    fileName: 'BanGhiAm_Shadowing_TiengTrung_PhongVan_HSK4.mp3',
    description: 'Ghi âm 5 phút bài tự giới thiệu bản thân & trả lời kỳ vọng lương • Nghiệm thu Tuần 3',
    type: 'audio',
    size: '5.1 MB',
    weekApproved: 'Tuần 3'
  },
  {
    id: 'art-4',
    fileName: 'Email_Templates_BusinessEnglish_InternalHR.docx',
    description: '15 mẫu thư thông báo tuyển dụng, offer letter, giải quyết khiếu nại • Nghiệm thu Tuần 1',
    type: 'word',
    size: '420 KB',
    weekApproved: 'Tuần 1'
  },
  {
    id: 'art-5',
    fileName: 'Mindmap_KienTruc_BoMay_HCNS_CongTy_500NhanSu.png',
    description: 'Bản đồ phân nhiệm HR Admin, C&B, Tuyển dụng và HRBP • Nghiệm thu Tuần 1',
    type: 'image',
    size: '1.8 MB',
    weekApproved: 'Tuần 1'
  }
];

export const initialMistakes: MistakeItem[] = [
  {
    id: 'mis-1',
    category: 'HCNS • Luật Lao Động',
    categoryColor: 'primary',
    timeTag: 'Sai hôm qua',
    content: 'Nhầm thời gian báo trước khi đơn phương chấm dứt HĐLĐ không xác định thời hạn (chuẩn: ít nhất 45 ngày).',
    detailedExplanation: 'Theo Điều 35 & 36 Bộ luật Lao động 2019: HĐLĐ không xác định thời hạn phải báo trước ít nhất 45 ngày; HĐLĐ xác định thời hạn từ 12-36 tháng báo trước 30 ngày; dưới 12 tháng báo trước 03 ngày làm việc.'
  },
  {
    id: 'mis-2',
    category: 'Tiếng Trung HSK 3',
    categoryColor: 'secondary',
    timeTag: 'Sai 2 lần',
    content: 'Phân biệt ngữ pháp cặp từ: 又 (lặp lại đã xảy ra) và 再 (lặp lại trong tương lai).',
    detailedExplanation: '又 (yòu) dùng cho hành động lặp lại đã phát sinh trong quá khứ hoặc hiện tại ("他又迟到了" - Anh ấy lại đi muộn rồi). 再 (zài) dùng cho hành động sẽ lặp lại trong tương lai ("明天我再来" - Ngày mai tôi sẽ lại đến).'
  },
  {
    id: 'mis-3',
    category: 'Tiếng Anh Công Sở',
    categoryColor: 'tertiary',
    timeTag: 'Phát âm',
    content: 'Nuốt âm đuôi khi nói các từ khóa HR: candidate, probationary, severance pay.',
    detailedExplanation: 'Cần bật rõ âm /t/ trong "candidate" /ˈkændɪdət/, chú ý trọng âm 1 của "probationary" /prəʊˈbeɪʃənəri/, và âm /s/ trong "severance" /ˈsevərəns/.'
  },
  {
    id: 'mis-4',
    category: 'TOEIC • Từ vựng',
    categoryColor: 'primary',
    timeTag: 'Tuần này',
    content: 'Lỗi phân biệt "Salary" và "Wage".',
    detailedExplanation: 'Salary: Lương cố định tháng/năm dành cho nhân sự văn phòng/chính thức. Wage: Tiền công tính theo giờ hoặc theo tuần (công nhân nhà xưởng, part-time).'
  },
  {
    id: 'mis-5',
    category: 'TOEIC • Phát âm',
    categoryColor: 'secondary',
    timeTag: 'Nghe hiểu',
    content: 'Bẫy nuốt âm "Schedule" (US vs UK).',
    detailedExplanation: 'Người Mỹ phát âm là /ˈskedʒ.uːl/, trong khi người Anh đọc thành /ˈʃedʒ.uːl/ dẫn đến việc nghe nhầm trong Part 3.'
  },
  {
    id: 'mis-6',
    category: 'TOEIC • Hợp đồng',
    categoryColor: 'tertiary',
    timeTag: 'Từ đồng âm',
    content: 'Nhầm lẫn "Resign" vs "Re-sign".',
    detailedExplanation: '"Resign" (từ chức, nghỉ việc) hoàn toàn trái nghĩa với "Re-sign" (tái ký tiếp tục hợp đồng lao động).'
  }
];

export const mentorNote: MentorNote = {
  mentorName: 'Mentor Hoàng Tuấn',
  mentorTitle: 'HR Director - Goertek Vina',
  mentorAvatar: 'HT',
  week: 3,
  note: 'Trong biên bản kỷ luật theo Điều 122, lỗi lớn nhất của các bạn mới là không gửi thông báo trước 3 ngày làm việc bằng văn bản có xác nhận ký nhận. Với bài 3.2, hãy bám sát án lệ số 54 về tranh chấp kỷ luật sa thải nhé.',
  lastReply: '2 giờ trước'
};

export const initialReflectionEntries: ReflectionEntry[] = [
  {
    id: 'ref-1',
    date: '2026-10-19',
    week: 3,
    disciplineScore: 5,
    energyScore: 4,
    biggestWin: 'Hoàn thành bài tập 3.1 Biên bản vi phạm kỷ luật đạt 9.5 điểm từ mentor.',
    bottleneck: 'Bị phân tâm 20 phút lúc tối do tin nhắn mạng xã hội.',
    adjustmentTomorrow: 'Bật chế độ Do Not Disturb trong 90 phút học đêm chuyên sâu C&B.'
  },
  {
    id: 'ref-2',
    date: '2026-10-18',
    week: 3,
    disciplineScore: 4,
    energyScore: 4,
    biggestWin: 'Nắm vững 30 từ vựng HSK 3 tuyển dụng và đọc thuộc 5 mẫu câu đón tiếp ứng viên.',
    bottleneck: 'Phần nghe TOEIC Part 3 giọng Úc nối âm còn bị sót 2 câu.',
    adjustmentTomorrow: 'Nghe Dictation tốc độ 0.8x trước rồi mới tăng 1.0x.'
  }
];
