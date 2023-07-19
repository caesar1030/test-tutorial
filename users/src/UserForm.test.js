import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

// 중요한 부분이 뭘까?

// 이름과 이메일 작성,
// 그리고 폼을 제출했을때 onUserAdd가 실행!되는것

test('두개의 인풋과 하나의 버튼을 보여주어야 한다', () => {
  // 컴포넌트 렌더
  render(<UserForm />);
  // 컴포넌트를 조작하거나 엘리먼트를 찾는다
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');
  // Assertion : 컴포넌트가 우리가 예상한대로 동작하는걸 assert
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('폼이 제출되면 onUserAdd를 호출한다', async () => {
  // 잘못된 테스트
  const argList = [];
  const callback = (...args) => {
    argList.push(args);
  };
  // 렌더
  render(<UserForm onUserAdd={callback} />);
  // 두개의 인풋을 찾음
  const [nameInput, emailInput] = screen.getAllByRole('textbox');
  // name에 타이핑 시뮬레이션
  user.click(nameInput);
  user.keyboard('jane');
  // emeail에 타이핑 시뮬레이션
  user.click(emailInput);
  user.keyboard('jane@jane.com');
  // 버튼 찾음
  const button = screen.getByRole('button');
  // 버튼 클릭 시뮬레이션
  user.click(button);
  // assert
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: '1', email: 'jane@jane.com' });
});
