import * as Popover from '@radix-ui/react-popover';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai'
import { AuthContext, signOut } from '../../../contexts/AuthContext';
import styles from './styles.module.scss';

const DropdownAvatarMenu = () => {

  const { signOut, user } = useContext(AuthContext)
  const [toggleMenu, setToggleMenu] = useState(false)

  return (

    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={styles.IconButton} aria-label="Update dimensions">
          <FiUser color="#000" size={24} />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className={styles.Text} style={{ marginBottom: 10 }}>
              Opções
            </p>
            <div className={styles.Fieldset}>
              <Link href={'/dashboard'}>
                <p>Editar Perfil</p>
              </Link>
            </div>
              <button className={styles.button} onClick={signOut}>
                <p>Sair</p>
                <FiLogOut color="#000" size={24} />
              </button>
          </div>
          <Popover.Close className={styles.PopoverClose} aria-label="Close">
            <AiOutlineClose  size={15} />
          </Popover.Close>
          <Popover.Arrow className={styles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>


  )
}

export default DropdownAvatarMenu;