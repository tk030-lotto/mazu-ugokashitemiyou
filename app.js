/**
 * app.js - まず動かしてみよう。
 * AI開発 実行アシスタント ロジック
 * Zero-Dependency / Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const userInput = document.getElementById('userInput');
  const charCount = document.getElementById('charCount');
  const presetChips = document.querySelectorAll('.chip');
  const toggleDetailBtn = document.getElementById('toggleDetailBtn');
  const optionalContent = document.getElementById('optionalContent');
  const envInput = document.getElementById('envInput');
  const filesInput = document.getElementById('filesInput');
  const generateBtn = document.getElementById('generateBtn');

  const resultSection = document.getElementById('resultSection');
  const promptDisplay = document.getElementById('promptDisplay');
  const promptEditArea = document.getElementById('promptEditArea');
  const copyBtn = document.getElementById('copyBtn');
  const editToggleBtn = document.getElementById('editToggleBtn');
  const resetBtn = document.getElementById('resetBtn');
  const toStep3Btn = document.getElementById('toStep3Btn');

  const verifySection = document.getElementById('verifySection');
  const checkItems = document.querySelectorAll('.check-item');
  const btnSuccess = document.getElementById('btnSuccess');
  const btnError = document.getElementById('btnError');

  // Modals & Toast
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const successModal = document.getElementById('successModal');
  const errorModal = document.getElementById('errorModal');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');
  const closeErrorBtn = document.getElementById('closeErrorBtn');
  const copyErrorPromptBtn = document.getElementById('copyErrorPromptBtn');
  const errorPromptText = document.getElementById('errorPromptText');

  let currentPrompt = '';
  let isEditing = false;
  let toastTimer = null;

  // 1. Character Counter
  userInput.addEventListener('input', () => {
    charCount.textContent = `${userInput.value.length} 文字`;
  });

  // 2. Preset Chips Click
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      userInput.value = chip.dataset.example || chip.textContent.trim();
      userInput.focus();
      charCount.textContent = `${userInput.value.length} 文字`;
      userInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // 3. Optional Accordion Toggle
  toggleDetailBtn.addEventListener('click', () => {
    const isExpanded = toggleDetailBtn.getAttribute('aria-expanded') === 'true';
    toggleDetailBtn.setAttribute('aria-expanded', String(!isExpanded));
    optionalContent.classList.toggle('is-hidden', isExpanded);
  });

  // 4. Prompt Generator Function
  function buildExecutionPrompt(content, env, files) {
    const trimmed = content.trim();
    const envText = env.trim() ? `【利用環境】: ${env.trim()}` : '';
    const filesText = files.trim() ? `【対象ファイル/コード情報】: ${files.trim()}` : '';

    return `AIに作ってもらった以下のソフトウェアについて、実際に動かすための手順を教えてください。

【作成してもらった内容】
${trimmed}
${envText ? `\n${envText}` : ''}${filesText ? `\n${filesText}` : ''}

【教えてほしいこと】
1. 必要な準備（必要なソフトウェア、ライブラリのインストール手順など）
2. どのファイルをどこに配置すればよいか
3. 実行するための具体的な手順・コマンド（初心者向けに分かりやすく）
4. 正常に起動・動作したかを確認するチェックポイント
5. もしエラーが発生した場合、どこを確認すればよいか

最初の一歩として、実際に動かしてみたいので、分かりやすく手順を教えてください。`;
  }

  // 5. Generate Button Click
  generateBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (!text) {
      showToast('⚠️ 作成してもらった内容を入力してください');
      userInput.focus();
      return;
    }

    currentPrompt = buildExecutionPrompt(text, envInput.value, filesInput.value);
    promptDisplay.textContent = currentPrompt;
    promptEditArea.value = currentPrompt;
    promptDisplay.style.display = 'block';
    promptEditArea.style.display = 'none';
    isEditing = false;
    editToggleBtn.textContent = '✏️ 修正する';

    resultSection.classList.remove('is-hidden');
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showToast('✨ AI確認用質問を作成しました！');
  });

  // 6. Copy Function
  function copyTextToClipboard(text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    tempArea.style.position = 'fixed';
    tempArea.style.opacity = '0';
    document.body.appendChild(tempArea);
    tempArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (e) {
      showToast('❌ コピーに失敗しました。手動でコピーしてください。');
    }
    document.body.removeChild(tempArea);
  }

  copyBtn.addEventListener('click', () => {
    const textToCopy = isEditing ? promptEditArea.value : currentPrompt;
    copyTextToClipboard(textToCopy, '📋 質問文をコピーしました！AIに送信しましょう');
  });

  // 7. Edit Toggle
  editToggleBtn.addEventListener('click', () => {
    isEditing = !isEditing;
    if (isEditing) {
      promptEditArea.value = currentPrompt;
      promptDisplay.style.display = 'none';
      promptEditArea.style.display = 'block';
      promptEditArea.focus();
      editToggleBtn.textContent = '💾 完了';
    } else {
      currentPrompt = promptEditArea.value;
      promptDisplay.textContent = currentPrompt;
      promptEditArea.style.display = 'none';
      promptDisplay.style.display = 'block';
      editToggleBtn.textContent = '✏️ 修正する';
      showToast('💾 質問文を保存しました');
    }
  });

  // 8. Reset Button
  resetBtn.addEventListener('click', () => {
    userInput.value = '';
    envInput.value = '';
    filesInput.value = '';
    charCount.textContent = '0 文字';
    resultSection.classList.add('is-hidden');
    verifySection.classList.add('is-hidden');
    userInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('🔄 入力をリセットしました');
  });

  // 9. Proceed to Step 3 (Verification Guide)
  toStep3Btn.addEventListener('click', () => {
    verifySection.classList.remove('is-hidden');
    verifySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // 10. Checklist Interactivity
  checkItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      item.classList.toggle('is-checked', checkbox.checked);
    });
  });

  // 11. Success Modal Handlers
  btnSuccess.addEventListener('click', () => {
    successModal.classList.add('is-open');
  });

  closeSuccessBtn.addEventListener('click', () => {
    successModal.classList.remove('is-open');
  });

  // 12. Error Modal Handlers
  btnError.addEventListener('click', () => {
    errorModal.classList.add('is-open');
  });

  closeErrorBtn.addEventListener('click', () => {
    errorModal.classList.remove('is-open');
  });

  copyErrorPromptBtn.addEventListener('click', () => {
    const errorText = errorPromptText.textContent.trim();
    copyTextToClipboard(errorText, '📋 エラー解決用プロンプトをコピーしました！');
  });

  // Close modal on backdrop click
  [successModal, errorModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-open');
      }
    });
  });

  // 13. Toast Notification Helper
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
