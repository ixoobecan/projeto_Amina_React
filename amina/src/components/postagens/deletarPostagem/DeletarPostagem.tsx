import React, { useEffect, useState, ChangeEvent } from "react"
import { Box } from '@mui/material'
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { buscaId, deleteId } from "../../../services/Service";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import Postagem from "../../../models/Postagem";

function DeletarPostagem(){
    let navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [ token, setToken ] = useLocalStorage("token")
    const [ post, setPosts ] = useState<Postagem>()

    useEffect(() => {
        if(token == ''){
            alert("Você precisa estar logado!")
            navigate("/login")
        }
    }, [token])

    useEffect(() => {
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string){
        buscaId(`/api/Postagens/idPostagem/${id}`, setPosts, {
            headers:{
                'Authorization': token
            }
        })
    }

    function sim(){
        navigate("/feed")
        deleteId(`/api/Postagens/idPostagem/${id}`, {
            headers:{
                'Authorization': token
            }
        });
        alert("Postagem deletada com sucesso!")
    }

    function nao(){
        navigate("/feed")
    }

    return(
        <>
            <Box m={2}>
                <Card variant="outlined">
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a Postagem:
                            </Typography>
                            <Typography color="textSecondary">
                                <strong>Título:</strong> {post?.titulo}
                            </Typography>
                            <Typography color="textSecondary">
                                <strong>Descrição:</strong> {post?.descricao}
                            </Typography>
                            <Typography color="textSecondary">
                                <strong>URL Foto:</strong> {post?.foto}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2}>
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size="large" color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box mx={2}>
                                <Button onClick={nao} variant="contained" size="large" color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}

export default DeletarPostagem;