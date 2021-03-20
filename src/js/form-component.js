function makeUI() {
  const frag = document.createDocumentFragment();
  const wrapper = document.createElement('div');
  wrapper.className = 'login-wrapper';

  const title = document.createElement('h6');
  title.textContent = 'login';

  wrapper.append(title);

  frag.append(wrapper);

  document.body.append(frag);
}

function initForm(selector) {
  const el = selector.querySelector('.form-id');
  el.focus();

  const userInput = selector.querySelectorAll('.user-input');

  userInput.forEach((input, index) => {
    const checkRole = [...input.classList].filter(cls =>
      ['number', 'eng', 'kor', 'symbol'].includes(cls)
    );

    if (checkRole.length > 0) {
      input.addEventListener('input', validCheck);
      input.addEventListener('paste', validCheck);
    }
  });

  selector
    .querySelector('.verity-try-btn.init')
    .addEventListener('click', function (event) {
      event.preventDefault();

      let totalSeconds = 179;

      const interval = setInterval(() => {
        const result = countDown(totalSeconds);
        totalSeconds -= 1;

        this.classList.remove('init');
        selector.querySelector('.verity-confirm-btn').classList.remove('hide');

        if (result[0] <= 0 && result[1] <= 0) {
          clearInterval(interval);
          this.textContent = `시간만료`;

          selector.querySelector('.verity-confirm-btn').classList.add('hide');
        } else {
          const min = result[0] === 0 ? '' : `${result[0]}:`;
          const sec = result[1] < 10 ? `0${result[1]}` : `${result[1]}`;
          this.textContent = `${min}${sec}`;
        }
      }, 1000);
    });
}

function countDown(totalSeconds) {
  const min = parseInt(totalSeconds / 60, 10);
  const sec = parseInt(totalSeconds % 60, 10);

  return [min, sec, totalSeconds];
}

/**
 *
 * @param {*} event
 * @param {*} role
 * [0,9] [0] : 최소길이, [1] : 최대길이
 * number : 숫자
 * eng : 영어
 * kor : 한글
 * symbol : 특수문자
 * @returns
 */
function validCheck(event, role) {
  if (event.data == null && event.clipboardData != null) return;

  const target = event.target;
  const value =
    event.clipboardData == null
      ? target.value
      : event.clipboardData.getData('text/plain');

  const checkRole = [...target.classList].filter(cls =>
    ['number', 'eng', 'kor', 'symbol'].includes(cls)
  );

  const length = [...target.classList].filter(cls => /{.*}/.exec(cls));
  const lengthRole = length.length > 0 ? length : '{1,}';

  const genRole = checkRole
    .reduce((makeRole, r) => {
      if (r === 'number') makeRole.push(/0-9/);
      if (r === 'eng') makeRole.push(/a-zA-Z/);
      if (r === 'kor') makeRole.push(/ㄱ-ㅎ|ㅏ-ㅣ|가-힣/);

      return makeRole;
    }, [])
    .map(reg => reg.source)
    .join('');

  if (new RegExp(`^(.)${lengthRole}$`, 'gi').test(value)) {
    const regExp = new RegExp(`[^${genRole}]${lengthRole}$`, 'gi');
    target.value = value.replace(regExp, '');
  } else {
    target.value = value.slice(0, value.length - 1);
  }
}

const loginLib = {
  makeUI,
  initForm
};

export default loginLib;
