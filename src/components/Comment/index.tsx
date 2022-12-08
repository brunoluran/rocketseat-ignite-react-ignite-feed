import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from '../Avatar';
import styles from './styles.module.css';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  //Se formos utilizar o valor atualizado da função, devemos criar uma varíavel responsável pela mudança
  // function handleLikeComment() {
  //   const newLikeCount = likeCount + 1;
  //   setLikeCount(newLikeCount);
  //   console.log(newLikeCount);
  // }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar bordeless src={'https://github.com/maykbrito.png'} />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Mayk Brito</strong>
              <time title='11 de Maio ás 08:27' dateTime='2022/05/11 08:27:07'>
                Cerca de 1h atrás
              </time>
            </div>
            <button title='Deletar comentário' onClick={() => onDeleteComment(content)}>
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
